import paramiko

HOST = "62.171.153.133"
USER = "root"
PASS = "irval55678"
DOMAIN = "hirecheck.eu"

def run(ssh, cmd):
    print(f"$ {cmd}")
    stdin, stdout, stderr = ssh.exec_command(cmd, timeout=120)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    rc = stdout.channel.recv_exit_status()
    if out.strip():
        print(out.strip().encode('ascii', 'replace').decode())
    if err.strip():
        print(err.strip().encode('ascii', 'replace').decode())
    return rc, out

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username=USER, password=PASS, timeout=15)
print("Connected!\n")

# Stop the hiresignal container on port 3000
run(ssh, "docker stop hiresignal && docker rm hiresignal")

# Create docker-compose with Caddy for hirecheck.eu
caddyfile = f"""{DOMAIN} {{
    reverse_proxy hiresignal:3000
}}

www.{DOMAIN} {{
    redir https://{DOMAIN}{{uri}}
}}
"""

compose = f"""services:
  hiresignal:
    image: hiresignal
    restart: unless-stopped
    expose:
      - "3000"

  caddy:
    image: caddy:2-alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config

volumes:
  caddy_data:
  caddy_config:
"""

# Write files
sftp = ssh.open_sftp()
run(ssh, "mkdir -p /opt/hiresignal")

with sftp.file("/opt/hiresignal/Caddyfile", "w") as f:
    f.write(caddyfile)
print("Wrote Caddyfile")

with sftp.file("/opt/hiresignal/docker-compose.yml", "w") as f:
    f.write(compose)
print("Wrote docker-compose.yml")

sftp.close()

# Check if port 80 is free or stop dreamlit caddy
print("\n=== Checking port 80 ===")
run(ssh, "ss -tlnp | grep ':80 '")

# Need to stop dreamlit caddy first, or use different ports
# Let's check what's using 80
rc, out = run(ssh, "docker ps --format '{{.Names}} {{.Ports}}' | grep ':80'")

if "dreamlit-caddy" in out:
    print("\nDreamlit Caddy is on port 80. Setting up shared Caddy instead...")

    # Add hirecheck.eu to the dreamlit Caddyfile
    # First read current one
    rc, current_caddy = run(ssh, "cat /opt/dreamlit/Caddyfile")

    # Check if we need to find the dreamlit domain
    rc, compose_content = run(ssh, "cat /opt/dreamlit/docker-compose.yml")

    # Add hiresignal to dreamlit's docker network and update Caddyfile
    # Better approach: add hirecheck.eu block to dreamlit Caddyfile

    new_block = f"""
{DOMAIN} {{
    reverse_proxy host.docker.internal:3000
}}

www.{DOMAIN} {{
    redir https://{DOMAIN}{{uri}}
}}
"""

    # Run hiresignal standalone on port 3000
    run(ssh, "docker run -d --name hiresignal --restart unless-stopped -p 3000:3000 hiresignal")

    # Add to dreamlit Caddyfile
    sftp = ssh.open_sftp()
    with sftp.file("/opt/dreamlit/Caddyfile", "r") as f:
        existing = f.read().decode()

    if DOMAIN not in existing:
        with sftp.file("/opt/dreamlit/Caddyfile", "w") as f:
            f.write(existing + "\n" + new_block)
        print(f"\nAdded {DOMAIN} to dreamlit Caddyfile")
    sftp.close()

    # Reload caddy
    run(ssh, "docker exec dreamlit-caddy-1 caddy reload --config /etc/caddy/Caddyfile")

    # If host.docker.internal doesn't work, connect to host network
    run(ssh, "docker network connect dreamlit_default hiresignal 2>/dev/null || echo 'already connected or different network'")

    # Update Caddyfile to use container name instead
    sftp = ssh.open_sftp()
    with sftp.file("/opt/dreamlit/Caddyfile", "r") as f:
        content = f.read().decode()
    content = content.replace("host.docker.internal:3000", "hiresignal:3000")
    with sftp.file("/opt/dreamlit/Caddyfile", "w") as f:
        f.write(content)
    sftp.close()

    run(ssh, "docker exec dreamlit-caddy-1 caddy reload --config /etc/caddy/Caddyfile")

else:
    # Port 80 free, use our own compose
    print("\nPort 80 is free, starting with docker-compose...")
    run(ssh, "cd /opt/hiresignal && docker compose up -d")

print(f"\n=== Checking result ===")
run(ssh, "docker ps --format '{{.Names}} {{.Status}}' | grep -E 'hiresignal|caddy'")
run(ssh, f"curl -s -o /dev/null -w '%{{http_code}}' http://localhost:3000")

print(f"\n=== DONE! ===")
print(f"1. Set DNS A record: {DOMAIN} -> {HOST}")
print(f"2. Set DNS A record: www.{DOMAIN} -> {HOST}")
print(f"3. Site will be at: https://{DOMAIN}")

ssh.close()

import paramiko

HOST = "62.171.153.133"
USER = "root"
PASS = "irval55678"

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

# Find current Caddyfile
print("=== Finding Caddy config ===")
run(ssh, "find /opt -name Caddyfile 2>/dev/null")
run(ssh, "find /opt -name docker-compose.yml 2>/dev/null | head -5")
run(ssh, "docker exec dreamlit-caddy-1 cat /etc/caddy/Caddyfile")

ssh.close()

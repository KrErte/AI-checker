import paramiko

HOST = "62.171.153.133"
USER = "root"
PASS = "irval55678"

def run(ssh, cmd):
    print(f"$ {cmd}")
    stdin, stdout, stderr = ssh.exec_command(cmd, timeout=30)
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

# Check hiresignal container status
run(ssh, "docker ps -a | grep hiresignal")

# Find dreamlit network name
run(ssh, "docker network ls | grep dreamlit")

# Connect hiresignal to dreamlit network
run(ssh, "docker network connect dreamlit_default hiresignal 2>&1 || echo 'trying to reconnect'")

# Verify connectivity
run(ssh, "docker exec dreamlit-caddy-1 ping -c 1 hiresignal 2>/dev/null || echo 'ping not available, trying wget'")
run(ssh, "docker exec dreamlit-caddy-1 wget -q -O /dev/null http://hiresignal:3000 2>&1 && echo 'CONNECTION OK' || echo 'CONNECTION FAILED'")

# Test
run(ssh, "curl -sk -o /dev/null -w '%{http_code}' https://hirecheck.eu")

ssh.close()

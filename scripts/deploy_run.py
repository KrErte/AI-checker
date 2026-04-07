import paramiko

HOST = "62.171.153.133"
USER = "root"
PASS = "irval55678"

def run(ssh, cmd):
    print(f"$ {cmd}")
    stdin, stdout, stderr = ssh.exec_command(cmd, timeout=60)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    rc = stdout.channel.recv_exit_status()
    if out.strip():
        print(out.strip().encode('ascii', 'replace').decode())
    if err.strip():
        print(err.strip().encode('ascii', 'replace').decode())
    return rc

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username=USER, password=PASS, timeout=15)

# Check what's on port 80
run(ssh, "ss -tlnp | grep :80")
run(ssh, "docker ps --format '{{.Names}} {{.Ports}}'")

# Remove failed container, run on 3000
run(ssh, "docker rm hiresignal 2>/dev/null; echo ok")
run(ssh, "docker run -d --name hiresignal --restart unless-stopped -p 3000:3000 hiresignal")
run(ssh, "sleep 2 && docker ps | grep hiresignal")

print(f"\n=== HireSignal is live at http://{HOST}:3000 ===")
ssh.close()

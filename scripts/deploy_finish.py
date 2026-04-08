import paramiko

HOST = "62.171.153.133"
USER = "root"
PASS = "irval55678"

def run(ssh, cmd):
    print(f"$ {cmd}")
    stdin, stdout, stderr = ssh.exec_command(cmd, timeout=300)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    rc = stdout.channel.recv_exit_status()
    if out.strip():
        print(out.strip().encode('ascii', 'replace').decode())
    if err.strip():
        print(err.strip().encode('ascii', 'replace').decode())
    print(f"[exit: {rc}]")
    return rc

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username=USER, password=PASS, timeout=15)
print("Connected!\n")

# Check if image already built
rc = run(ssh, "docker images hirecheck --format '{{.ID}}'")

if rc != 0 or True:
    # Build
    print("\nBuilding (may take a few minutes)...")
    run(ssh, "cd /opt/hirecheck && docker build -t hirecheck . 2>&1")

# Stop old, run new
run(ssh, "docker stop hirecheck 2>/dev/null; docker rm hirecheck 2>/dev/null; echo ok")
run(ssh, "docker run -d --name hirecheck --restart unless-stopped -p 80:3000 hirecheck")
run(ssh, "docker ps | grep hirecheck")

print(f"\n=== HireCheck is live at http://{HOST} ===")
ssh.close()

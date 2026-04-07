import paramiko
import time

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

# Restart caddy completely to force fresh cert attempt
run(ssh, "docker restart dreamlit-caddy-1")
print("Waiting 10s for Caddy to restart...")
time.sleep(10)

# Check
run(ssh, "curl -sk -o /dev/null -w '%{http_code}' https://hirecheck.eu 2>/dev/null || echo 'SSL not ready yet'")
run(ssh, "curl -s -o /dev/null -w '%{http_code}' http://hirecheck.eu")
run(ssh, "docker logs dreamlit-caddy-1 2>&1 | grep -i 'hirecheck' | tail -5")

ssh.close()

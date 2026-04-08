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

# Restart with HOSTNAME=0.0.0.0
run(ssh, "docker stop hirecheck && docker rm hirecheck")
run(ssh, "docker run -d --name hirecheck --restart unless-stopped --network dreamlit_default -e HOSTNAME=0.0.0.0 -p 3000:3000 hirecheck")

import time
time.sleep(3)

run(ssh, "docker exec dreamlit-caddy-1 wget -q -O /dev/null http://hirecheck:3000 2>&1 && echo 'CONNECTION OK' || echo 'FAILED'")
run(ssh, "curl -sk -o /dev/null -w '%{http_code}' https://hirecheck.eu")

ssh.close()

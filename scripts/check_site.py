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

run(ssh, "docker logs dreamlit-caddy-1 2>&1 | tail -30")
run(ssh, "cat /opt/dreamlit/Caddyfile")
run(ssh, "curl -s -o /dev/null -w '%{http_code}' http://hirecheck.eu")
run(ssh, "docker exec dreamlit-caddy-1 caddy fmt --overwrite /etc/caddy/Caddyfile && docker exec dreamlit-caddy-1 caddy reload --config /etc/caddy/Caddyfile")

ssh.close()

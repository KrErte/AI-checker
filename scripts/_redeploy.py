"""One-shot rebuild + restart on server. Uploads only changed files (route.ts, lib/*, migrations)."""
import os, sys, paramiko
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

PWD = os.environ["DEPLOY_PASS"]
HOST = "62.171.153.133"

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username="root", password=PWD, timeout=15)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
files = [
    "src/app/api/reports/route.ts",
    "src/lib/rate-limit.ts",
    "src/lib/slug.ts",
    "package.json",
    "package-lock.json",
    "supabase/migrations/002_security_hardening.sql",
]

sftp = ssh.open_sftp()
for rel in files:
    local = os.path.join(ROOT, rel.replace("/", os.sep))
    remote = f"/opt/hiresignal/{rel}"
    print(f"upload {rel}")
    try:
        sftp.stat(os.path.dirname(remote))
    except IOError:
        ssh.exec_command(f"mkdir -p {os.path.dirname(remote)}")[1].channel.recv_exit_status()
    sftp.put(local, remote)
sftp.close()

def run(cmd, timeout=900):
    print(f"$ {cmd[:140]}")
    _, out, err = ssh.exec_command(cmd, timeout=timeout)
    o = out.read().decode("utf-8", "replace")
    e = err.read().decode("utf-8", "replace")
    rc = out.channel.recv_exit_status()
    if o.strip(): print(o[-2500:])
    if e.strip(): print("ERR:", e[-800:])
    print(f"[exit {rc}]")
    return rc

run("docker rm -f hiresignal 2>/dev/null; echo cleaned")
run("cd /opt/hiresignal && docker build --no-cache -t hiresignal . 2>&1 | tail -25", timeout=900)
run("docker run -d --name hiresignal --restart unless-stopped --network dreamlit_default -e HOSTNAME=0.0.0.0 -e PORT=3000 -p 3002:3000 hiresignal")
run("sleep 4 && docker logs hiresignal 2>&1 | tail -10")
run("docker exec dreamlit-caddy-1 wget -qO- -S http://hiresignal:3000/ 2>&1 | head -5 || true")
run('curl -sS -o /dev/null -w "https=%{http_code}\\n" https://hirecheck.eu')
ssh.close()

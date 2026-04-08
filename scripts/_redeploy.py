"""One-shot rebuild + restart on server. Uploads changed files and mounts a data volume."""
import os, sys, paramiko
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

PWD = os.environ["DEPLOY_PASS"]
HOST = "62.171.153.133"

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username="root", password=PWD, timeout=15)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
files = [
    "Dockerfile",
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/app/opengraph-image.tsx",
    "src/app/privacy/page.tsx",
    "src/app/terms/page.tsx",
    "src/app/methodology/page.tsx",
    "src/app/about/page.tsx",
    "src/app/human-review/page.tsx",
    "src/app/cv-check/page.tsx",
    "src/app/ai-act-ready/page.tsx",
    "src/app/ai-act-ready/success/page.tsx",
    "src/app/api/reports/route.ts",
    "src/app/api/stats/route.ts",
    "src/app/api/ai-act-lead/route.ts",
    "src/components/header.tsx",
    "src/components/footer.tsx",
    "src/components/live-counter.tsx",
    "src/components/report-form.tsx",
    "src/lib/article22.ts",
    "src/lib/rate-limit.ts",
    "src/lib/slug.ts",
    "src/lib/store.ts",
    "src/lib/cv-analyzer.ts",
    "src/lib/ai-act-check.ts",
    "src/lib/leads.ts",
    "public/compliance-templates/01-ai-systems-inventory.md",
    "public/compliance-templates/02-ai-disclosure-statement.md",
    "public/compliance-templates/03-privacy-policy-addendum.md",
    "public/compliance-templates/04-candidate-hiring-ai-notice.md",
    "public/compliance-templates/05-internal-ai-usage-policy.md",
    "public/compliance-templates/06-vendor-ai-ddq.md",
    "public/compliance-templates/07-dpia-starter.md",
    "public/compliance-templates/08-audit-log-template.md",
    "package.json",
    "package-lock.json",
    "supabase/migrations/002_security_hardening.sql",
]

sftp = ssh.open_sftp()
def ensure_dir(remote_dir):
    parts = remote_dir.strip("/").split("/")
    p = ""
    for seg in parts:
        p += "/" + seg
        try:
            sftp.stat(p)
        except IOError:
            try:
                sftp.mkdir(p)
            except IOError:
                pass

for rel in files:
    local = os.path.join(ROOT, rel.replace("/", os.sep))
    remote = f"/opt/hirecheck/{rel}"
    print(f"upload {rel}")
    ensure_dir(os.path.dirname(remote))
    sftp.put(local, remote)
sftp.close()

def run(cmd, timeout=900):
    print(f"$ {cmd[:160]}")
    _, out, err = ssh.exec_command(cmd, timeout=timeout)
    o = out.read().decode("utf-8", "replace")
    e = err.read().decode("utf-8", "replace")
    rc = out.channel.recv_exit_status()
    if o.strip(): print(o[-2500:])
    if e.strip(): print("ERR:", e[-800:])
    print(f"[exit {rc}]")
    return rc

run("mkdir -p /opt/hirecheck/data && chown -R 1001:1001 /opt/hirecheck/data")
run("docker rm -f hirecheck 2>/dev/null; echo cleaned")
run("cd /opt/hirecheck && docker build --no-cache "
    "--build-arg NEXT_PUBLIC_PLAUSIBLE_DOMAIN=hirecheck.eu "
    "-t hirecheck . 2>&1 | tail -30", timeout=900)
run("docker run -d --name hirecheck --restart unless-stopped "
    "--network dreamlit_default "
    "-e HOSTNAME=0.0.0.0 -e PORT=3000 -e DATA_DIR=/app/data "
    "-v /opt/hirecheck/data:/app/data "
    "-p 3002:3000 hirecheck")
run("sleep 5 && docker logs hirecheck 2>&1 | tail -15")
run("docker exec dreamlit-caddy-1 wget -qO- http://hirecheck:3000/api/stats 2>&1 | head -5 || true")
run('curl -sS -o /dev/null -w "https=%{http_code}\\n" https://hirecheck.eu')
run('curl -sS -o /dev/null -w "human-review=%{http_code}\\n" https://hirecheck.eu/human-review')
run('curl -sS -o /dev/null -w "stats=%{http_code}\\n" https://hirecheck.eu/api/stats')
run('curl -sS -o /dev/null -w "ai-act-ready=%{http_code}\\n" https://hirecheck.eu/ai-act-ready')
run('curl -sS -o /dev/null -w "template01=%{http_code}\\n" https://hirecheck.eu/compliance-templates/01-ai-systems-inventory.md')
ssh.close()

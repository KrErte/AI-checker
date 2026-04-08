import paramiko
import os
import sys

HOST = os.environ.get("DEPLOY_HOST", "62.171.153.133")
USER = os.environ.get("DEPLOY_USER", "root")
PASS = os.environ.get("DEPLOY_PASS")
PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

if not PASS:
    print("ERROR: DEPLOY_PASS environment variable is not set.")
    print("Usage: DEPLOY_PASS=yourpass python scripts/deploy.py")
    sys.exit(1)

def run(ssh, cmd, label=""):
    if label:
        print(f">>> {label}")
    print(f"$ {cmd}")
    stdin, stdout, stderr = ssh.exec_command(cmd, timeout=300)
    out = stdout.read().decode()
    err = stderr.read().decode()
    exit_code = stdout.channel.recv_exit_status()
    if out.strip():
        print(out.strip().encode('ascii', 'replace').decode())
    if err.strip():
        print(err.strip().encode('ascii', 'replace').decode())
    if exit_code != 0:
        print(f"[exit code: {exit_code}]")
    return out, err, exit_code

def main():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    print(f"Connecting to {HOST}...")
    ssh.connect(HOST, username=USER, password=PASS, timeout=15)
    print("Connected!\n")

    # Check if Docker is installed
    _, _, rc = run(ssh, "docker --version", "Check Docker")
    if rc != 0:
        print("Installing Docker...")
        run(ssh, "curl -fsSL https://get.docker.com | sh", "Install Docker")
        run(ssh, "systemctl enable docker && systemctl start docker", "Start Docker")

    # Check if Node is available (for building on server)
    _, _, rc = run(ssh, "node --version")

    # Create project dir on server
    run(ssh, "mkdir -p /opt/hirecheck", "Create project dir")

    # Upload project files via SFTP
    print("\n>>> Uploading project files...")
    sftp = ssh.open_sftp()

    files_to_upload = []
    for root, dirs, files in os.walk(PROJECT_DIR):
        # Skip node_modules, .next, .git
        dirs[:] = [d for d in dirs if d not in ('node_modules', '.next', '.git', 'temp-app', 'scripts', 'docs', '.github', '.playwright-mcp', '.venv', 'venv', '__pycache__')]
        for f in files:
            local_path = os.path.join(root, f)
            rel_path = os.path.relpath(local_path, PROJECT_DIR).replace("\\", "/")
            remote_path = f"/opt/hirecheck/{rel_path}"
            files_to_upload.append((local_path, remote_path))

    # Create remote dirs
    created_dirs = set()
    for local_path, remote_path in files_to_upload:
        remote_dir = os.path.dirname(remote_path)
        if remote_dir not in created_dirs:
            run(ssh, f"mkdir -p {remote_dir}")
            created_dirs.add(remote_dir)

    # Upload files
    for local_path, remote_path in files_to_upload:
        rel = os.path.relpath(local_path, PROJECT_DIR)
        print(f"  Uploading {rel}")
        sftp.put(local_path, remote_path)

    sftp.close()
    print(f"Uploaded {len(files_to_upload)} files.\n")

    # Build and run with Docker on the server
    run(ssh, "cd /opt/hirecheck && docker stop hirecheck 2>/dev/null; docker rm hirecheck 2>/dev/null; echo ok", "Stop old container")

    print("\n>>> Building Docker image on server (this may take a few minutes)...")
    out, err, rc = run(ssh, "cd /opt/hirecheck && docker build --no-cache -t hirecheck . 2>&1", "Docker build")
    if rc != 0:
        print("Docker build failed!")
        sys.exit(1)

    run(ssh,
        "docker run -d --name hirecheck --restart unless-stopped "
        "--network dreamlit_default "
        "-e HOSTNAME=0.0.0.0 -e PORT=3000 "
        "-p 3002:3000 hirecheck",
        "Run container on dreamlit_default network (Caddy reverse-proxies hirecheck.eu)")

    print("\n>>> Checking container status...")
    run(ssh, "docker ps | grep hirecheck")

    print(f"\n=== DONE! HireCheck is live at http://{HOST} ===")

    ssh.close()

if __name__ == "__main__":
    main()

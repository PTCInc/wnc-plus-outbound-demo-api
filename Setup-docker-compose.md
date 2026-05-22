## Setup

### Using Docker-Compose -

1. Install docker compose

```bash
curl --retry 3 -sLo- "https://get.docker.com" | bash
# appends docker group to local login to avoid prefixing every docker command with sudo
sudo usermod --append --groups docker $(id -un)
# need to launch a new shell after this command
```

2. Run containers

> Replace \<myservername.com> with your server hostname, \<myserverdns> with your server DNS and \<0.0.0.0> with your server's IP.

```bash
SERVER_CN=<myservername.com> SERVER_DNS=<myserverdns> SERVER_IP=<0.0.0.0> docker-compose up -d
# example: SERVER_CN=$(hostname) SERVER_DNS=$(hostname --fqdn) SERVER_IP=$(hostname -I | awk '{print $1;}') docker-compose up -d
```

You can now access the endpoints on `https://<SERVER_DNS>:443` or `https://<SERVER_IP>:443`.

3. To stop containers

```bash
docker-compose down --volumes
```

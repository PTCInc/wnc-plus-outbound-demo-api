## Setup

### Using Docker-Compose -

1\. Install docker-compose

```plaintext
sudo curl -L https://github.com/docker/compose/releases/download/1.25.3/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
```

```plaintext
sudo chmod +x /usr/local/bin/docker-compose
```

2\. Run the docker-compose file

> Replace \<myservername.com> with your server hostname, \<myserverdns> with your server DNS and \<0.0.0.0> with your server's IP.

```plaintext
sudo SERVER_CN=<myservername.com> SERVER_DNS=<myserverdns> SERVER_IP=<0.0.0.0> docker-compose up -d
```

> Example, SERVER_CN=nodejs-https-server SERVER_DNS=nodejs-https-server.rx.internal.cloudapp.net SERVER_IP=20.235.43.50 docker-compose up -d

You can now access the endpoints on `https://<SERVER_DNS>:443` or `https://<SERVER_IP>:443`.

3\. To stop docker-compose

```plaintext
sudo docker-compose down --volumes
```
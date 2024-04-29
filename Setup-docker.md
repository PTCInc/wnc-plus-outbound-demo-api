## Setup

### Using Docker -

1\. Create a custom bridge network

```plaintext
sudo docker network create mynetwork
```

2\. Build and run PostgreSQL container

```plaintext
sudo docker build -t mypostgresimage -f dockerfilePostgres .
```

```plaintext
sudo docker run --network=mynetwork --name postgres -d mypostgresimage
```

3\. Build and run Node.js container

```plaintext
sudo docker build -t mynodejsimage -f dockerfileNodeJs .
```

> Replace \<myservername.com> with your server hostname, \<myserverdns> with your server DNS and \<0.0.0.0> with your server's IP.

```plaintext
sudo docker run -e SERVER_CN=<myservername.com> SERVER_DNS=<myserverdns> SERVER_IP=<0.0.0.0> -v $(pwd)/certificates:/usr/src/app/certificates/ --network=mynetwork --name nodejs -p 443:443 -d mynodejsimage
```

You can now access the endpoints on `https://<SERVER_DNS>:443` or `https://<SERVER_IP>:443`.

4\. To stop docker containers

```plaintext
sudo docker stop nodejs
```

```plaintext
sudo docker stop postgres
```
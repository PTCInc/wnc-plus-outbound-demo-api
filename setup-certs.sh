# ----------------------------------------------------------------------------
# This file is copyright (c) PTC, Inc.
# All rights reserved.
# 
# Name:        setup-certs.sh
# Description: This shell script (setup-certs.sh) generates self-signed root, client,
# and server certificates for secure communication. It utilizes OpenSSL to create the
# certificates. The client and server certificate is signed by the root certificate. Configuration 
# values for the server certificate are extracted from the openssl.cnf file. Environment 
# variables such as SERVER_CN, SERVER_DNS, and SERVER_IP are used in the openssl.cnf file
# and must be provided by the user when running the Docker containers. The client certificate
# is bundled in the client.keycertchain format, including the client key, client certificate,
# and root certificate chain. Similarly, the server certificate is bundled in the
# server.certchain format, including the server certificate and root certificate chain.
#
# Update History:
# 0.0.1: Initial Release
#
# Version: 0.0.2
# ----------------------------------------------------------------------------

#!/usr/bin/env bash
mkdir -p certificates/certs

# Export environment variables (these are used in openssl.cnf)
export SERVER_CN=${SERVER_CN:-AcmeServer}
export SERVER_DNS=${SERVER_DNS:-AcmeServer.com}
export SERVER_IP=${SERVER_IP:-0.0.0.0}

# Generate Root certificates
[ -f certificates/certs/root.key ] || openssl genrsa -out certificates/certs/root.key 2048
[ -f certificates/certs/root.csr ] || openssl req -new -sha256 -key certificates/certs/root.key -out certificates/certs/root.csr -subj "/C=IN/ST=Maharashtra/L=Pune/O=Acme/CN=root.acme.com"
[ -f certificates/certs/root.crt ] || openssl x509 -req -sha256 -days 30 -in certificates/certs/root.csr -signkey certificates/certs/root.key -out certificates/certs/root.crt

# Generate Server certificates
[ -f certificates/certs/server.key ] || openssl genrsa -out certificates/certs/server.key 2048
[ -f certificates/certs/server.csr ] || openssl req -new -sha256 -key certificates/certs/server.key -out certificates/certs/server.csr -config <(cat openssl.cnf)
[ -f certificates/certs/server.crt ] || openssl x509 -req -in certificates/certs/server.csr -CA certificates/certs/root.crt -CAkey certificates/certs/root.key -CAcreateserial -out certificates/certs/server.crt -days 30 -sha256 -extfile <(cat openssl.cnf) -extensions req_ext

# Generate Client certificates
[ -f certificates/certs/client.key ] || openssl genrsa -out certificates/certs/client.key 2048
[ -f certificates/certs/client.csr ] || openssl req -new -sha256 -key certificates/certs/client.key -out certificates/certs/client.csr -subj "/C=IN/ST=Maharashtra/L=Nagpur/O=AcmeClient/CN=client.acmeclient.com"
[ -f certificates/certs/client.crt ] || openssl x509 -req -in certificates/certs/client.csr -CA certificates/certs/root.crt -CAkey certificates/certs/root.key -CAcreateserial -out certificates/certs/client.crt -days 30 -sha256

# Create client.keycertchain file containing chain of key, client certificate and root certificate
cat certificates/certs/client.key > certificates/client.keycertchain
cat certificates/certs/client.crt >> certificates/client.keycertchain
cat certificates/certs/root.crt >> certificates/client.keycertchain

echo
echo "=== Client PEM bundle ==="
cat certificates/client.keycertchain

# Create server.certchain file containing chain of server certificate and root certificate
cat certificates/certs/server.crt > certificates/server.certchain
cat certificates/certs/root.crt >> certificates/server.certchain

echo
echo "=== Server PEM bundle ==="
cat certificates/server.certchain

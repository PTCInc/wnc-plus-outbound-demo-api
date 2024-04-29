### **REST Endpoints**

*   GET - `https://localhost:443/api/material/` Get a unique material number.
*   GET - `https://localhost:443/api/material/:id:` Check if a material number is present or not.
*   GET - `https://localhost:443/api/materials/:` List all material data present in the DB.    
*   PUT - `https://localhost:443/api/material/` Add material to the Postgres DB.             
*   PATCH - `https://localhost:443/api/material/:id:` Update material in the Postgres DB.
*   DELETE - `https://localhost:443/api/material/:id:` Delete material with a specific material ID. 
*   DELETE - `https://localhost:443/api/materials/:` Delete all materials. 
*   GET - `https://localhost:443/api/materialData/stream/:id` Continously streams inventory data. 

### **SSL Certificates**

Server and client certificates are generated automatically when container is started. You will see certificates folder generated in current working directory. It contains client certificate chain and server certificate chain.

### Authentication

To obtain a bearer token, make a POST request to `https://localhost:443/generateToken` with the following JSON data:

```plaintext
{
    "userName": "admin",
    "password": "admin"
}
```

Example - with `curl`, you can run this:

```plaintext
curl --insecure -X POST --cert client.crt --key client.key --cacert root.crt -H "Content-Type: application/json" -d '{"userName":"admin","password":"admin"}' https://localhost/generateToken/
```

Use this bearer token in _Authorization_ header while making requests. e.g. ‘bearer \*\*\*\*token\_value\*\*\*\*’. 

Example -

1\. GET request (Get a unique material number)

```plaintext
curl --insecure --cert client.crt --key client.key --cacert root.crt -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXIiOiJhZG1pbiIsInBhc3MiOiJhZG1pbiJ9LCJpYXQiOjE3MDY2MDYyMjB9._IXm0e_qiIhJnQzXviw10wVHwK5NbqDLzgwroU-rrAA" https://localhost:443/api/material/
```

2\. POST request (Add material to the Postgres DB)

```plaintext
curl --insecure -X POST --cert client.crt --key client.key --cacert root.crt -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXIiOiJhZG1pbiIsInBhc3MiOiJhZG1pbiJ9LCJpYXQiOjE3MDY2MDYyMjB9._IXm0e_qiIhJnQzXviw10wVHwK5NbqDLzgwroU-rrAA" -d '{"materialNumber": "GLE123","materialName": "MATERIAL_1877675157024030826","materialDescription": "vwqatuifabaalgndincp","materialStartDate": "2023-08-22T00:00:00.000Z","materialPrice": 46781}' https://localhost/api/material/
```

### **Sample JSON Data required to POST**

```plaintext
{
        "materialNumber": "GLE123",
        "materialName": "MATERIAL_1877675157024030826",
        "materialDescription": "vwqatuifabaalgndincp",
        "materialStartDate": "2023-08-22T00:00:00.000Z",
        "materialPrice": 46781
}
```

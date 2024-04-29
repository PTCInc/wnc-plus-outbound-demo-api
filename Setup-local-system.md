### On local computer -

### Prerequisites

*   Node.js installed
*   Postgres database created

### Installation

1\. Clone the repository:

```plaintext
git clone <REPO_URL>
```

2\. Install dependencies:

```plaintext
npm install
```

3\. Run the SQL script to set up the database and create a user:

```plaintext
psql -U <your_postgres_user> -d <your_database_name> -a -f init.sql
```

4\. Update .env file, change SERVER=postgres to SERVER=localhost

5\. Start the server:

```plaintext
npm start
```

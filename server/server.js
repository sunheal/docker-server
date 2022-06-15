const express = require('express');
const app = express();
const port = 4444;

const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  password: 'psql_docker',
  // host: 'the-name-for-my-postgres-container-within-the-docker-compose-yml-file',
  host: 'postgres_container',
  database: 'postgres',
  port: 5432,
})

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});


app.get('/', (req, res) => {
  client.query('SELECT * FROM team;', (err, dbResponse) => {
    if (err) {
      res.status(400);
      res.send('Database is not connected successfully!');
    }
    res.send(dbResponse);
    client.end();
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
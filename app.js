const express = require('express');
const bodyparser = require('body-parser');
const { reset } = require('nodemon');
const cookieParser = require('cookie-parser');
const Pool = require('pg').Pool;
const connection = new Pool({
  user: 'dev',
  host: 'localhost',
  database: 'students',
  password: 'dev-password',
  port: 5432
});
const app = express();
const port = 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/students', (req, res) => {
  let search = req.query.search ? `%${req.query.search}%` : '%';
  connection.query(
    'SELECT * FROM students WHERE first_name LIKE $1',
    [search],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify(results.rows));
    }
  );
});

app.listen(port, () => console.log('listening on port 3000'));

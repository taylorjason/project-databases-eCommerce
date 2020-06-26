const express = require('express');
const bodyparser = require('body-parser');
const { reset } = require('nodemon');
const cookieParser = require('cookie-parser');
const queries = require('./queries');
const Pool = require('pg').Pool;
const connection = new Pool({
  user: 'dev',
  host: 'localhost',
  database: 'ecommerce-project',
  password: 'dev-password',
  port: 5432
});
const app = express();
const port = 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

// USERS
// http://localhost:3000/users/?search=Jason
// http://localhost:3000/users/

app.get('/users/', (req, res) => {
  let search = req.query.search ? `%${req.query.search}%` : '%';
  connection.query(
    'SELECT * FROM users WHERE first_name ILIKE $1 OR last_name ILIKE $2',
    [search, search],
    (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send(JSON.stringify(results.rows));
      }
    }
  );
});

app.patch('/users/:userID', (req, res) => {
  let update = req.body;
  let updateStr = [];
  let id = req.params.userID;

  for (let key in update) {
    updateStr.push(`${key} = '${update[key]}'`);
  }
  connection.query(
    `UPDATE users SET ${updateStr.join(', ')} WHERE id = $1 RETURNING *`,
    [id],
    (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send(JSON.stringify(results.rows));
      }
    }
  );
});

app.delete('/users/:userID', (req, res) => {
  let deleteUser = req.params.userID;

  connection.query(
    'DELETE FROM users WHERE id = $1 RETURNING *',
    [deleteUser],
    (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send(JSON.stringify(results.rows));
      }
    }
  );
});

app.post('/users/', (req, res) => {
  let newUser = req.body;
  let newStr = [];

  console.log(req.body);
  for (let key in newUser) {
    newStr.push(`'${newUser[key]}'`);
  }
  console.log(newStr.join(', '));

  let pass = '(' + newStr.join(', ') + ')';
  connection.query(
    `INSERT INTO users (first_name, last_name, email) VALUES ${pass} RETURNING *`,
    (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(JSON.stringify(results.rows));
      }
    }
  );
});

app.get('/manufacturers', queries.getManufacturers);
app.post('/manufacturers', queries.postManufacturers);
app.patch('/manufacturers/:manufacturersID', queries.patchManufacturers);
app.delete('/manufacturers/:manufacturersID', queries.deleteManufacturers);

app.get('/items', queries.getItems);
app.post('/items', queries.postItems);
app.patch('/items/:itemID', queries.patchItems);
app.delete('/items/:itemID', queries.deleteItems);

app.get('/purchaseOrders', queries.getPurchaseOrders);
// app.post('/purchaseOrder', queries.postPurchaseOrders);
// app.patch('/purchaseOrder/:poID', queries.patchPurchaseOrders);
// app.delete('/PurchaseOrder/:poID', queries.deletePurchaseOrders);

app.listen(port, () => console.log('listening on port 3000'));

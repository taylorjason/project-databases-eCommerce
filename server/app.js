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
const port = 3001;



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
let allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};
app.use(allowCrossDomain);

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
  let id = req.params.userID;

  connection
    .query('SELECT * FROM users where ID = $1', [id])
    .then((results) => {
      let user = results.rows[0];

      for (let key in user) {
        if (key in req.body) {
          user[key] = req.body[key];
        }
      }
      return user;
    })
    .catch((err) => res.send(err.message))
    .then((user) => {
      console.log(user);
      connection.query(
        `UPDATE users SET first_name = $2, last_name = $3, email = $4 WHERE id = $1 RETURNING *`,
        [id, user.first_name, user.last_name, user.email],
        (error, results) => {
          if (error) {
            res.send(error.message);
          } else {
            res.send(JSON.stringify(results.rows));
          }
        }
      );
    })
    .catch((err) => res.send(err.message));
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

app.get('/manufacturers', queries.getHandler('manufacturers'));
app.post('/manufacturers', queries.postManufacturers);
app.patch('/manufacturers/:manufacturersID', queries.patchManufacturers);
app.delete('/manufacturers/:manufacturersID', queries.deleteManufacturers);

app.get('/items', queries.getHandler('items'));
app.post('/items', queries.postItems);
app.patch('/items/:itemID', queries.patchItems);
app.delete('/items/:itemID', queries.deleteItems);

app.get('/purchaseOrders', queries.getPurchaseOrders);
app.post('/purchaseOrders', queries.postPurchaseOrders);
app.patch('/purchaseOrders/:poID', queries.patchPurchaseOrders);
app.delete('/PurchaseOrders/:poID', queries.deletePurchaseOrders);

app.get('/salesOrders', queries.getSalesOrders);
app.post('/salesOrders', queries.postSalesOrders);
app.patch('/salesOrders/:salesID', queries.patchSalesOrders);
app.delete('/salesOrders/:salesID', queries.deleteSalesOrders);

app.get('/customers', queries.getHandler('customers'));

app.listen(port, () => console.log(`API listening on port ${port}`));

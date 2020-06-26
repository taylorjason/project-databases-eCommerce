const Pool = require('pg').Pool;
const connection = new Pool({
  user: 'dev',
  host: 'localhost',
  database: 'ecommerce-project',
  password: 'dev-password',
  port: 5432
});

//manufacturersQueries.js;
const getHandler = (type) => {
  let table = type;
  return (req, res) => {
    let search = req.query.search ? `%${req.query.search}%` : '%';
    connection.query(
      `SELECT * FROM ${table} WHERE company_name ILIKE $1`,
      [search],
      (error, results) => {
        if (error) {
          res.send(error.message);
        } else {
          res.send(JSON.stringify(results.rows));
        }
      }
    );
  };
};

const getManufacturers = (req, res) => {
  let search = req.query.search ? `%${req.query.search}%` : '%';
  connection.query(
    'SELECT * FROM manufacturers WHERE company_name ILIKE $1',
    [search],
    (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send(JSON.stringify(results.rows));
      }
    }
  );
}; //ready to test

const patchManufacturers = (req, res) => {
  let update = req.body;
  let updateStr = [];
  let id = req.params.manufacturersID;

  for (let key in update) {
    updateStr.push(`${key} = '${update[key]}'`);
  }
  connection.query(
    `UPDATE manufacturers SET ${updateStr.join(
      ', '
    )} WHERE id = $1 RETURNING *`,
    [id],
    (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send(JSON.stringify(results.rows));
      }
    }
  );
};

const deleteManufacturers = (req, res) => {
  let deleteManufacturer = req.params.manufacturersID;

  connection.query(
    'DELETE FROM manufacturers WHERE id = $1 RETURNING *',
    [deleteManufacturer],
    (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send(JSON.stringify(results.rows));
      }
    }
  );
};

const postManufacturers = (req, res) => {
  let newUser = req.body;
  let newStr = [];

  for (let key in newUser) {
    newStr.push(`'${newUser[key]}'`);
  }
  console.log(newStr.join(', '));

  let pass = '(' + newStr.join(', ') + ')';
  connection.query(
    `INSERT INTO manufacturers (company_name, contact_name, contact_email, contact_phone) VALUES ${pass} RETURNING *`,
    (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send(JSON.stringify(results.rows));
      }
    }
  );
};

///////////////////////////////////////////////////////////////

//itemsQueries;

const getItems = (req, res) => {
  let search = req.query.search ? `%${req.query.search}%` : '%';
  connection.query(
    'SELECT * FROM items WHERE item_name ILIKE $1 OR item_desc ILIKE $1',
    [search],
    (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send(JSON.stringify(results.rows));
      }
    }
  );
};

const patchItems = (req, res) => {
  let update = req.body;
  let updateStr = [];
  let id = req.params.itemID;

  for (let key in update) {
    updateStr.push(`${key} = '${update[key]}'`);
  }
  connection.query(
    `UPDATE items SET ${updateStr.join(', ')} WHERE id = $1 RETURNING *`,
    [id],
    (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send(JSON.stringify(results.rows));
      }
    }
  );
};

const deleteItems = (req, res) => {
  let deleteItem = req.params.itemID;

  connection.query(
    'DELETE FROM items WHERE id = $1 RETURNING *',
    [deleteItem],
    (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send(JSON.stringify(results.rows));
      }
    }
  );
};

const postItems = (req, res) => {
  let newItem = req.body;
  let newStr = [];

  for (let key in newItem) {
    newStr.push(`'${newItem[key]}'`);
  }
  console.log(newStr.join(', '));

  let pass = '(' + newStr.join(', ') + ')';
  connection.query(
    `INSERT INTO items (item_name, item_desc, manufacturer_id) VALUES ${pass} RETURNING *`,
    (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send(JSON.stringify(results.rows));
      }
    }
  );
};

///////////////////////////////////////////////////////////////

//POQueries;

const getPurchaseOrders = (req, res) => {
  let search = req.query.search ? `%${req.query.search}%` : '%';
  connection.query(
    'SELECT order_date, date_recieved, qty, first_name, last_name, item_name, item_desc, company_name FROM (SELECT * from (SELECT * from (SELECT * from purchaseorder inner join users on users.id = purchaseorder.user_id) as po_users inner join items on items.id = po_users.item_id) as po_users_items inner join manufacturers on po_users_items.manufacturer_id = manufacturers.id) as po_w_mans where company_name ILIKE $1',
    [search],
    (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send(JSON.stringify(results.rows));
      }
    }
  );
};

const patchPurchaseOrders = (req, res) => {
  let update = req.body;
  let updateStr = [];
  let orderID = req.params.poID;

  for (let key in update) {
    updateStr.push(`${key} = '${update[key]}'`);
  }
  connection.query(
    `UPDATE purchaseOrder SET ${updateStr.join(
      ', '
    )} WHERE id = $1 RETURNING *`,
    [orderID],
    (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send(JSON.stringify(results.rows));
      }
    }
  );
}; //Test Ready

const deletePurchaseOrders = (req, res) => {
  let deleteItem = req.params.poID;

  connection.query(
    'DELETE FROM purchaseOrder WHERE id = $1 RETURNING *',
    [deleteItem],
    (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send(JSON.stringify(results.rows));
      }
    }
  );
}; //Test Ready

const postPurchaseOrders = (req, res) => {
  let newItem = req.body;
  let newStr = [];

  for (let key in newItem) {
    newStr.push(`'${newItem[key]}'`);
  }
  console.log(newStr.join(', '));

  let pass = '(' + newStr.join(', ') + ')';
  connection.query(
    `INSERT INTO purchaseOrder (user_id, order_date, date_recieved, item_id, qty) VALUES ${pass} RETURNING *`,
    (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send(JSON.stringify(results.rows));
      }
    }
  );
}; //Test Ready

///////////////////////////////////////////////////////////////

module.exports = {
  getItems,
  postItems,
  patchItems,
  deleteItems,
  getHandler,
  postManufacturers,
  patchManufacturers,
  deleteManufacturers,
  getPurchaseOrders
};

//manufacturersQueries.js;

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
  
  ///////////////////////////////////////////////////////////////
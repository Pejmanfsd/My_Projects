const sql = require("./db.js");

// Constructor
const Users = function (user) {
  this.email = user.email;
  this.password = user.password;
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.address = user.address;
  this.registrationDate = user.registrationDate;
  this.isRegistered = user.isRegistered;
  //this.isRegistered = user.isRegistered == 0 ? 'inactive' : 'active';
  this.role = user.role;
};

// Create a user
Users.create = (newUsers, result) => {
  sql.query("INSERT INTO users SET ?", newUsers, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created users: ", { id: res.insertId, ...newUsers });
    result(null, { id: res.insertId, ...newUsers });
  });
};

// Return one user by id
Users.findById = (id, result) => {
  // FIXME: prevent SQL injection
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found users: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Not found Users with the id
    result({ kind: "not_found" }, null);
  });
};

// Return one user by email
Users.findByEmail = (email, result) => {
  // FIXME: prevent SQL injection
  sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found users: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Not found Users with the email
    result({ kind: "not_found" }, null);
  });
};

// Return all scores
Users.getAll = (sortOrder, result) => {
  var query = sql.format("SELECT * FROM users");

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("user: ", res);
    result(null, res);
  });
};

// Update a user 
Users.updateById = (id, users, result) => {
  sql.query(
    "UPDATE users SET email = ?, password = ?, firstName = ?, lastName = ?, address = ?, isRegistered = ? WHERE id = ?",
    [users.email, users.password, users.firstName, users.lastName, users.address, users.isRegistered, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      //problem affectedRows
      if (res.affectedRows == 0) {
        // not found users with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated users: ", { id: id, ...users });
      result(null, { id: id, ...users });
    }
  );
};

// Delete a user
Users.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found users with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted users with id: ", id);
    result(null, res);
  });
};

module.exports = Users;
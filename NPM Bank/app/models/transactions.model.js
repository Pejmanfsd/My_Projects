const sql = require("./db.js");

// constructor
const Transactions = function (transaction) {
    this.id = transaction.id;
    this.accountId = transaction.accountId;
    this.amount = transaction.amount;
    this.dateTime = transaction.dateTime;
    this.type = transaction.type;
};


Transactions.getAll = (sortOrder, result) => {
    var query = sql.format("SELECT * FROM transactions");

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("transactions: ", res);
        result(null, res);
    });
};

Transactions.getAllByRange = (id, startDate, endDate, result) => {
    
    sql.query("SELECT * FROM transactions WHERE accountId = ? AND DATE(dateTime) BETWEEN ? AND ?", [id, startDate, endDate], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("transactions: ", res);
        result(null, res);
    });
};


Transactions.findById = (id, result) => {
    sql.query("SELECT * FROM transactions WHERE accountId = ?", [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found transaction: ", res[0]);
        result(null, res);
        return;
      }
  
      // not found transaction with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Transactions.create = (newTransactions, result) => {
    sql.query("INSERT INTO transactions SET ?", newTransactions, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created transactions: ", { id: res.insertId, ...newTransactions });
      result(null, { id: res.insertId, ...newTransactions });
    });
  };
  

  Transactions.updateById = (id, transactions, result) => {
    sql.query(
      "UPDATE transactions SET accountID = ?, amount = ?, dateTime = ?, type = ? WHERE id = ?",
      [transactions.accountId, transactions.amount, transactions.dateTime, transactions.type, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found transaction with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated transaction: ", { id: id, ...transactions });
        result(null, { id: id, ...transactions });
      }
    );
  };


  Transactions.remove = (id, result) => {
    sql.query("DELETE FROM transactions WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found transactions with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted transactions with id: ", id);
      result(null, res);
    });
  };


module.exports = Transactions;



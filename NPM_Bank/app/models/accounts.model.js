// Model for all 'accounts' SQL Queries.
// Ordered by POST, GET, PUT, DELETE, validation

const sql = require("./db.js");

// constructor
const Accounts = function (account) {
    this.kind = account.kind;
    this.currentBalance = account.currentBalance;
    this.userId = account.userId;
    this.active = account.active;
};

Accounts.create = (newAccount, result) => {
    sql.query("INSERT INTO accounts SET ?", newAccount, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        console.log("Created account: ", { ...newAccount });
        result(null, { ...newAccount });
    });
};

Accounts.getAll = (sortOrder, result) => {
    var query = sql.format("SELECT * FROM accountswithusername");

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("account: ", res);
        result(null, res);
    });
};

//Account by Account Id
Accounts.findById = (id, result) => {
    sql.query("SELECT * FROM accounts WHERE userId = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found account: ", res[0]);
            result(null, res[0]);
            return;
        };
    });
};

//Account by User Id
Accounts.findByUserId = (id, result) => {
    sql.query("SELECT * FROM accounts WHERE userId = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found account: ", res[0]);
            result(null, res[0]);
            return;
        };
    });
};

Accounts.updateById = (id, accounts, result) => {
    sql.query(
        "UPDATE accounts SET kind = ?, currentBalance = ?, active = ? WHERE id = ?",
        [accounts.kind, accounts.currentBalance, accounts.active, id],
        (err, res) => {
            if (err) {
                console.log(err);
                result(null, err);
                return
            }

            if (res.affectedRow == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated account: ", { id: id, ...accounts });
            result(null, { id: id, ...accounts });
        }
    );
};

//TODO: important! Account balance must be 0. Admin only, at user request.
Accounts.remove = (id, result) => {
    sql.query("DELETE FROM accounts WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted account with id: ", id);
        result(null, res);
    })

}

module.exports = Accounts;

const Accounts = require("../models/accounts.model");

//TODO: Rework isValid1 into a proper function
exports.create = (req, res) => {
    console.log(req.headers);
    if (isValid(req, res) === true) {
        const account = new Accounts({
            kind: req.body.kind,
            currentBalance: req.body.currentBalance,
            userName: req.body.userName,
            userId: req.body.userId,
            active: req.body.active,

        });
        Accounts.create(account, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Server-side error while creating the account."
                });
            } else {
                res.status(201).send(data);
            }
        });
    }
};

exports.findAll = (req, res) => {
    // ToDo: setup sort order
    var sortOrder = "";

    Accounts.getAll(sortOrder, (err, data) => {
        if (err) {
            console.log("Error retrieving accounts:", err);
            res.status(500).json({
                error: "Internal server error",
            });
        } else {
            res.status(200).json(data);
        }
    });
};

//Account by Account Id
exports.findOne = (req, res) => {
    Accounts.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found account with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving account with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Account by User ID
exports.findOneAlt = (req, res) => {
    Accounts.findByUserId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found account with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving account with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    Accounts.updateById(req.params.id, new Accounts(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found account with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating accounts with id ${req.params.id}`
                });
            }
        } else res.send(data);
    }
    );
};


exports.delete = (req, res) => {
    Accounts.findById(req.params.id, (err, account) => {
        if (err) {
            res.status(500).send({
                message: `Error retrieving account with id ${req.params.id}.`
            });
        } else if (!account) {
            res.status(404).send({
                message: `Account not found with id ${req.params.id}.`
            });
        } else {
            if (account.currentBalance >0) {
                res.status(400).send({
                    message: `Cannot delete account with non-zero currentBalance.`
                });
            } else {
                Accounts.remove(req.params.id, (err, data) => {
                    if (err) {
                        res.status(500).send({
                            message: `Could not delete account with id ${req.params.id}.`
                        });
                    } else {
                        res.send({ message: `Account was deleted successfully!` });
                    }
                });
            }
        }
    });
};



function isValid(req, res) {
    if (!(req.body.userId)) {
        res.status(400).send({
            message: "error with userId!"
        });
        return false
    }
    return true;
}







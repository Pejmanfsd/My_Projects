const Transactions = require("../models/transactions.model");
const transactionsRoutes = require("../routes/routes");


// Retrieve all Airports from the database (with condition).
exports.findAll = (req, res) => {
    
    var sortOrder = "";
    Transactions.getAll(sortOrder, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving transaction."
            })
        else res.send(data);
    });
};

exports.findRange = (req, res) => {
    
    var startDate = req.params.startdate.slice(0,4) + "-"+ req.params.startdate.slice(4,6) + "-" +  req.params.startdate.slice(6,8);
    var endDate = req.params.enddate.slice(0,4) + "-"+ req.params.enddate.slice(4,6) + "-" +  req.params.enddate.slice(6,8);
    var id = req.params.id;

    Transactions.getAllByRange(id, startDate, endDate, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving transaction with range."
            })
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Transactions.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found transaction with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving transaction with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};


exports.create = (req, res) => {
    // Validate request
    //var validationPassesd = validateRequest(req, res);

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // if (validationPassesd) {
    // Create a transaction 
    const transactionsRoutes = new Transactions({
        id: req.body.id,
        accountId: req.body.accountId,
        amount: req.body.amount,
        dateTime: req.body.dateTime,
        type: req.body.type
    });

    // Save transaction in the database
    Transactions.create(transactionsRoutes, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the transaction."
            });
        else res.status(201).send(data);
    });
    // }

};

// Update a transactions identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Transactions.updateById(req.params.id, new Transactions(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found transactions with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating transactions with id " + req.params.id
                });
            }
        } else res.send(data);
    }
    );
};


exports.delete = (req, res) => {
    Transactions.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found transactions with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete transactions with id " + req.params.id
                });
            }
        } else res.send({ message: `Transaction was deleted successfully!` });
    });
};
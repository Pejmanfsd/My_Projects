const { PASSWORD } = require("../config/dbconfig");
const Users = require("../models/users.model");

// Create and Save a new user
exports.create = (req, res) => {

    // Validate request
      if (!req.body) {
         res.status(400).send({
             message: "Content can not be empty!"
         });
     }

    var isValidResult = isValid(req, res);
    if (isValidResult === true) {
    // Create a Users
    const users = new Users({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        registrationDate: req.body.registrationDate,
        isRegistered: req.body.isRegistered,
        role: req.body.role
    });

    // Save Users in the database
    Users.create(users, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Users."
            });
        else res.status(201).send(data);
    });
    } 
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

    var sortOrder = "";
    Users.getAll(sortOrder, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            })
        else res.send(data);
    });
};

// Find a single user by the id
exports.findOne = (req, res) => {
    Users.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Users with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Users with id " + req.params.id
                });
            }
        } else res.status(200).send(data);
    });
};

// Find a single user by the email
exports.findEmail = (req, res) => {
    Users.findByEmail(req.params.email, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Users with email ${req.params.email}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Users with email " + req.params.email
                });
            }
        } else res.status(200).send(data);
    });
};

// Update a User by id
exports.update = (req, res) => {
    // Validate Request
     if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    
    console.log(req.body);
    // record need to be exists(404) --> record not found
    // if (isValid(req, res)) {
    Users.updateById(
        req.params.id,
        new Users(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Users with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Users with id " + req.params.id
                    });
                }
            } else res.status(200).send(true);
        }
    );
   // }
};

// Delete a User with id
exports.delete = (req, res) => {
    Users.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Users with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Users with id " + req.params.id
                });
            }
        } else res.status(200).send({ message: true });
    });
};

// The validation function
function isValid(req, res) {

    // Validation 1: When we add a row to the user's table, we shouldn't mention id
    if (req.body.id) {
        res.status(400).send({
            message: "id is an auto-increment field, don't mention it in your request",
            result: false
        });
        return false;
    }

    // Validation 2: The first name should have 2-20 letters
    if (req.body.firstName.length < 2 || req.body.firstName.length > 20) {
        res.status(400).send({ message: "Firstname should have at least 2 and at most 20 letters" });
        return false;
    }

    // Validation 3: The last name should have 2-20 letters
    if (req.body.lastName.length < 2 || req.body.lastName.length > 20) {
        res.status(400).send({ message: "Lastname should have at least 2 and at most 20 letters" });
        return false;
    }

    // Validation 4: Registration date should be after 2010
    if (Date.parse(req.body.registrationDate) <  Date.parse('01 Jan 2010 00:00:00 GMT')) {
        res.status(400).send({ message: "Registration date should be after 2010" });
        return false;
    }

    // Validation 5: Registration date can't be from the future!
    if (Date.parse(req.body.registrationDate) > new Date()) {
        res.status(400).send({ message: "Registration date can't be from the future!" });
        return false;
    }

    // Validation 6: Address should start with a number
    if (isNaN(req.body.address.slice(0, 1))) {
        res.status(400).send({ message: "Address should start with a number" });
        return false;
    }

    // Validation 7: The database accepts either 'user' or 'admin' in the role field
    if (req.body.role != "user" && req.body.role !== "admin") {
        res.status(400).send({ message: "The value of role should be either 'user' or 'admin'." });
        return false;
    }

    // Validation 8: The database accepts either 0 or 1 in the isRegistered field
    if (req.body.isRegistered != 0 && req.body.isRegistered != 1) {
        res.status(400).send({ message: "The value of isRegistered should be either 0 or 1" });
        return false;
    }
    return true;
}
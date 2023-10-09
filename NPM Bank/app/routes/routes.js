module.exports = app => {
    const transactions = require("../controllers/transactions.controller");
    const users = require("../controllers/users.controller");
    const accounts = require("../controllers/accounts.controller");
    const documents = require("../controllers/documents.controller.js");

    var router = require("express").Router();

    // transactions APIs
    router.post("/transactions/", transactions.create);
    router.get("/transactions/", transactions.findAll);
    router.get("/transactions/:id([0-9]+)", transactions.findOne);
    router.get("/transactions/:id([0-9]+)/:startdate([0-9]{8})/:enddate([0-9]{8})", transactions.findRange);
    router.put("/transactions/:id([0-9]+)", transactions.update);
    router.delete("/transactions/:id([0-9]+)", transactions.delete);
   
    // users APIs
    router.post("/users/", users.create);
    router.get("/users/", users.findAll);
    router.get("/users/:id([0-9]+)", users.findOne);
    router.get("/users/:email", users.findEmail);
    router.put("/users/:id([0-9]+)", users.update);
    router.delete("/users/:id([0-9]+)", users.delete);

    // accounts APIs
    router.post("/accounts/", accounts.create);
    router.get("/accounts/", accounts.findAll);
    router.get("/accounts/:id([0-9]+)", accounts.findOne);
    router.get("/accounts/:id([0-9]+)", accounts.findOneAlt);
    router.put("/accounts/:id([0-9]+)", accounts.update);
    router.delete("/accounts/:id([0-9]+)", accounts.delete);

    // documents APIs (new - need to create table then test)
    router.post("/documents/", documents.create);
    router.get("/documents/:id([0-9]+)", documents.findOne);
    router.get("/documents/", documents.findAll);

    app.use('/api/', router);

};
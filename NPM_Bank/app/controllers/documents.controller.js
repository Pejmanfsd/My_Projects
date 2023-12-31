const DocumentsClass = require("../models/documents.model");

//Create and Save a new Todo
exports.create = (req, res) => {
    // TODO: validate, e.g. check max size, mime-type, title content
    // console.log("REQ BODY: " + JSON.stringify(req.body)); // careful, you'll print out the whole uploaded file, can be hundreds of lines of text
    const item = new DocumentsClass({
        title: req.body.title,
        data: Buffer.from(req.body.data, 'base64'), // decode base64 to binary data for storage
        mimeType: req.body.mimeType || 'Pending'
    });

    // Save ToDo in the database
    DocumentsClass.create(item, (err, item) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Internal error occurred while creating this document."
            });
        else res.status(201).send(item);
    });
};

// Retrieve all Todos from the database (with condition).
exports.findAll = (req, res) => {
    const validSortOrders = ["id", "title", "mimeType"];
    const sortOrder = req.query.sortOrder ? req.query.sortOrder : "id"; // sort by id if no sortOrder provided
    if (!validSortOrders.includes(sortOrder)) {
        res.status(400).send({
            message: "invalid sort order value"
        });
        return;
    }
    DocumentsClass.getAll(sortOrder, (err, list) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving todos."
            });
        else res.status(200).send(list);
    });
};

//Find a single todo by the id
exports.findOne = (req, res) => {
    DocumentsClass.findById(req.params.id, (err, item) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ToDo with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ToDo with id " + req.params.id
                });
            }
        } else {
            // Note: by sending this header you can force download instead of display. filename is optional
            // Content-Disposition: attachment; filename="filename.jpg"
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition
            res.contentType(item.mimeType).status(200).send(item.data);
        }
    });
};

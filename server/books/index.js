//exports.version = '0.0.1';
var express = require('express');
var Book = require('./Book.js');
var role = require('../users/role.js');

var router = express.Router();

module.exports = router;

router.get('/:id', role.allow(role.VIEW_BOOKS), function(req, res) {
    Book.findById(req.params.id)
        .then(function(book) {
                res.json(book)
            },
            function(err) {
                res.status(500).json(err);
            });
});

router.post('/', role.allow(role.EDIT_BOOKS), function(req, res) {
    var data = {
        uuid: req.body.uuid || generateUuid(),
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        author: req.body.author
    };

    Book.create(data)
        .then(function(book) {
                res.json(book)
            },
            function(err) {
                res.status(500).json(err);
            })
});

router.get('/', role.allow(role.VIEW_BOOKS), function(req, res) {
    Book.all().then(function(list) {
            res.json(list)
        },
        function(err) {
            res.status(500).json(err);
        })
});

//TODO
function encript(pass) {
    return pass;
}

function generateUuid() {
    return (Date.now() + "-" + (100000 - Math.random() * 10000));
}

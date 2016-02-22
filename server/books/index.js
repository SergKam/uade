//exports.version = '0.0.1';
var express = require('express');
var Book = require('./Book.js');
var role = require('./role.js');

var router = express.Router();

module.exports = router;

router.get('/:id', role.allow(role.VIEW_USERS), function(req, res) {
    Book.findById({
            uuid: req.params.id
        })
        .then(function(book) {
                res.json(book)
            },
            function(err) {
                res.status(500).json(err);
            });
});

router.post('/', function(req, res) {
    var data = {
        uuid: req.body.uuid || generateUuid(),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: encript(req.body.password)
    };

    Book.create(data)
        .then(function(book) {
                res.json(book)
            },
            function(err) {
                res.status(500).json(err);
            })
});

router.get('/', role.allow(role.VIEW_USERS), function(req, res) {
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

function loginFaled(res, time) {
    setTimeout(function() {
        res.status(401).json({message: "Login faled"});
    }, time || 3000);
}

//exports.version = '0.0.1';
var express = require('express');
var User = require('./User.js');
var role = require('./role.js');

var router = express.Router();

module.exports = router;

router.get('/auth', function(req, res) {
    if (req.session.user) {
        res.json(req.session.user)
    } else {
        loginFaled(res, 1);
    }
});

router.post('/auth', function(req, res) {
    var data = {
        email: req.body.email,
        password: encript(req.body.password)
    };

    User.findOne({
            where: {
                email: data.email
            }
        })
        .then(function(user) {
                if (!user || (user.password !== data.password)) {
                    loginFaled(res);
                    return;
                }

                req.session.user = user;
                res.json(user)
            },
            function() {
                loginFaled(res)
            });
});

router.delete('/auth', function(req, res) {
    req.session.user = null;
    res.json({
        message: "Auth session stopped"
    });
});

router.post('/reset', function(req, res) {
    var data = {
        email: req.body.email
    };

    User.findOne({
            where: {
                email: data.email
            }
        })
        .then(function(user) {
                //not found
                if (!user) {
                    loginFaled(res);
                    return;
                }

                //TODO generate password and send it to email

                res.json({
                    user: user,
                    message: "New password sent"
                })
            },
            function() {
                loginFaled(res)
            });
});

router.get('/:id', role.allow(role.VIEW_USERS), function(req, res) {
    User.findById({
            uuid: req.params.id
        })
        .then(function(user) {
                res.json(user)
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

    User.create(data)
        .then(function(user) {
                res.json(user)
            },
            function(err) {
                res.status(500).json(err);
            })
});

router.get('/', role.allow(role.VIEW_USERS), function(req, res) {
    User.all().then(function(list) {
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

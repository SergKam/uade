#!/usr/bin/env node
var async = require('async');
var express = require('express');
var logger = require("morgan");
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var db = require('./db.js');
var config = require('./config.js');

var sessionStore = require('./sessionStore.js');

var usersApi = require("./users/index.js");


var app = express();

app.use(logger('combined'));
app.use(cookieParser());
app.use(session({
    secret: config.session.secret,
    store: sessionStore,
    proxy: true // if you do SSL outside of node.
}));

app.use(bodyParser.json());

app.use(config.net.path + '/users', usersApi);

app.use(express.static(config.static));

//create all db tables
console.log("init DB");
db.sync().then(function() {
        console.log("try listening on port:" + config.net.port);
        app.listen(config.net.port, config.net.address, function() {
                console.log("server listening at " + config.net.address + " http://localhost:" + config.net.port);
            }
        );

    }, fail.bind(null, 'failed init db')
);

function fail(msg, e) {
    console.log(msg);
    console.error(e);
    process.exit(1);

}

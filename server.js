#!/usr/bin/env node
var async = require('async');
var express = require('express');
var logger = require("morgan");
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var config = require('./server/config.js');
var usersApi = require("./server/users/index.js");

// initalize sequelize with session store
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var app = express();

var db = new Sequelize(config.db);

app.use(logger('combined'));
app.use(cookieParser());
app.use(session({
    secret: config.session.secret,
    store: new SequelizeStore({
        db: db
    }),
    proxy: true // if you do SSL outside of node.
}));

app.use(bodyParser.json());

app.use(config.net.path + '/users', usersApi(db));

app.use(express.static('client'));

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

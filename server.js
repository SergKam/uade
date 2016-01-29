var async = require('async');
var express = require('express');
var logger = require("morgan");
var bodyParser = require('body-parser');
var Sequelize = require('sequelize')
var cookieParser = require('cookie-parser')
var session = require('express-session');
// initalize sequelize with session store
var SequelizeStore = require('connect-session-sequelize')(session.Store);


var app = express();

var db = new Sequelize("mysql://"+process.env.C9_USER+"@"+process.env.IP+":3306/c9");
var store =  new SequelizeStore({
        db: db
    });



app.use(logger('combined'));
app.use(cookieParser())
app.use(session({
    secret: 'khbjshfjh hvf7790-keyboard cat',
    store:store,
    proxy: true // if you do SSL outside of node.
}));

app.use(bodyParser.json());

var usersApi = require("./server/users/index.js");
app.use('/api/v1/users', usersApi.create(db));

app.use(express.static('client'));

//create all db tables
db.sync();

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    console.log("server listening at", process.env.IP + ":" + process.env.PORT);
});

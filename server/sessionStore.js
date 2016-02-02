var db = require('./db.js');

var session = require('express-session');
// initalize sequelize with session store
var SequelizeStore = require('connect-session-sequelize')(session.Store);

module.exports = new SequelizeStore({
    db: db
});

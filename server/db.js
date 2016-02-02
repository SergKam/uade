var Sequelize = require('sequelize');
var config = require('./config.js');

module.exports = new Sequelize(config.db);

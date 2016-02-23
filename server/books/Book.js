var Sequelize = require('sequelize');
var db = require('../db.js');

module.exports = db.define('books', {
    uuid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    year: Sequelize.STRING,
    registeredDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    description: Sequelize.TEXT,
    avatarUrl: {
        type: Sequelize.STRING,
        defaultValue: "" //,
        //  validate: {
        //        isUrl: true
        //  }
    }
});

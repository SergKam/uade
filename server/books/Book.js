var Sequelize = require('sequelize');
var db = require('../db.js');

module.exports = db.define('books', {
    uuid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    title: Sequelize.STRING,
    year: Sequelize.STRING,
    role: {
        type: Sequelize.STRING,
        defaultValue: "USER"
    },
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

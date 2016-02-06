var Sequelize = require('sequelize');
var db = require('../db.js');

module.exports = db.define('users', {
    uuid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    role: {
        type: Sequelize.STRING,
        defaultValue: "USER"
    },
    password: Sequelize.STRING,

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

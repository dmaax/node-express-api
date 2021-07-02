const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Key = require('../models/Key');
const User = require('../models/User');

const connection = new Sequelize(dbConfig);

Key.init(connection);
User.init(connection);

module.exports = connection;
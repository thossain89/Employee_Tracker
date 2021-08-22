const mysql = require('mysql2');
require('dotenv').config();
const chalk = require('chalk');

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user:  process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:  process.env.DB_NAME
});
connection.connect(function (err) {
    if (err) throw err;
    console.log(chalk.bgGreen('Connection Successful!'));
});

module.exports = connection;
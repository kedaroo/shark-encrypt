require("dotenv").config();
const mysql = require("mysql2");

const { DATABASE_URL } = process.env;

const connection = mysql.createConnection(DATABASE_URL);

connection.connect()

console.log('connected with db successfully')

module.exports = connection;

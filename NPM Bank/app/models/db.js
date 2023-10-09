const mysql = require("mysql2");
const dbConfig = require("../config/dbconfig.js");

// Create connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  dateStrings: true,
});

// Open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the banking database");
});

module.exports = connection;

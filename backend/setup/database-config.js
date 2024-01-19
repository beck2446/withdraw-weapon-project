const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}).promise()

connection.ping()
.then(() => console.log('Connected to MySQL database.')
)
.catch(err => console.log('Error connecting to MySQL database:', err)
);

module.exports = connection
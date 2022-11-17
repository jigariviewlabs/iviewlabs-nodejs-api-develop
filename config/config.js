const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DBHOST,  
  user: process.env.DBUSER,  
  password: process.env.DBPASSWORD, 
  database: process.env.DBNAME
});

module.exports = pool.promise();


const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'campus_secondhand_transaction',
    port:'3307'
});

module.exports = pool
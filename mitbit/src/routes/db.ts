const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Dwnn00??))',
  database: 'Bill'
});

connection.connect((err: any) => {
  if (err) throw err;
  console.log('Connected to MYSQL');
});

module.exports = connection;
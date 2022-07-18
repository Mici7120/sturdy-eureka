//PERMITE CONEXION A BASE DE DATOS

const mysql2 = require('mysql2');

const database = mysql2.createConnection({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'b1790a51dbfc82',
  password: '7f98b119',
  database: 'heroku_bd6ca11d350692e',
});

module.exports = database;

//ENLACE mysql://b1790a51dbfc82:7f98b119@us-cdbr-east-06.cleardb.net/heroku_bd6ca11d350692e?reconnect=true

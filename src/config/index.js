const app = require('./app');
const database = require('./database');

//ENCARGADO DE HACER LA CONEXION DEL SERVIDOR Y DE
const main = () => {
    database.connect((err) => {
      if (err) throw err;
      console.log('Base de datos conectada');
    });
  
    app.listen(3001, () => {
      console.log('Servidor escuchando puerto 3001');
    });
  };
  
  main();



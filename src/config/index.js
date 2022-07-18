const database = require('./database');

const express = require('express');
const userRoutes= require('../routes/routes');
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// endpoints: A PARTIR DE EL COMANDO /user se van a enlistar todas las rutas que tienen logica
// endpoints
app.use('/user', userRoutes);

// parse application/json
//app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('cliente/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'cliente', 'build', 'index.html'));
  });
}

//ENCARGADO DE HACER LA CONEXION DEL SERVIDOR Y DE
const main = () => {
    database.connect((err) => {
      if (err) throw err;
      console.log('Base de datos conectada');
    });
  
    app.listen(process.env.PORT || 5000, () => {
      console.log('Servidor escuchando en puerto ' + process.env.PORT);
    });
  };
  
  main();



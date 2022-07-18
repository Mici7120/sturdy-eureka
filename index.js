const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const database = require('./src/config/database');
const userRoutes = require('./src/routes/routes');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// endpoints: A PARTIR DE EL COMANDO /user se van a enlistar todas las rutas que tienen logica
// endpoints
app.use('/user', userRoutes);

// parse application/jsoncle
app.use(bodyParser.json());

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
  console.log("cliente iniciado");
}

//ENCARGADO DE HACER LA CONEXION DEL SERVIDOR Y DE
const main = () => {
  database.connect((err) => {
    if (err) throw err;
    console.log('Base de datos conectada');
  });
  const PORT = process.env.PORT || 5000;
  console.log(PORT);

  app.listen(PORT, () => {
    console.log('Servidor escuchando en puerto ' + PORT);
  });
};

main();
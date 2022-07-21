const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const app = express();

const userRoutes = require('./src/routes/user.routes');
const solicitudesRoutes = require('./src/routes/solicitudes.routes');
const articulosRoutes = require('./src/routes/articulos.routes');

const database = require('./src/config/database');

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'https://sturdy-eureka.herokuapp.com/',
  clientID: 'qFBppnilvWboCnpZkoJIfsrs0Dw4aKGE',
  issuerBaseURL: 'https://dev-r3tadgyd.us.auth0.com',
  secret: 'LONG_RANDOM_STRING'
};

app.use(auth(config));

// req.oidc.isAuthenticated is provided from the auth router
/*
app.get('/', (req, res) => {
  res.send(
    req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
  )
});
*/

// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

// Express will serve up production assets
// like our main.js file, or main.css file!
app.use('/', express.static('cliente/build'));

const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'cliente', 'build', 'index.html'));
  //console.log("cliente iniciado");
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// endpoints: A PARTIR DE EL COMANDO /user se van a enlistar todas las rutas que tienen logica
// endpoints
app.use('/user', userRoutes);
app.use('/solicitudes', solicitudesRoutes);
app.use('/articulos', articulosRoutes);

//ENCARGADO DE HACER LA CONEXION DEL SERVIDOR Y DE
const main = () => {
  database.connect((err) => {
    if (err) throw err;
    console.log('Base de datos conectada');
  });
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Servidor escuchando puerto ' + PORT);
  });
};

main();



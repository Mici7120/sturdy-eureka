const express = require('express');
const { todasSolicitudes } = require('../controllers/solicitudes');

const router = express.Router();
router.get('/', todasSolicitudes);

module.exports = router;
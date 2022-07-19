const express = require('express');
const router = express.Router();
const {
    todosArticulos
} = require('../controllers/articulos');

router.get('/', todosArticulos);

module.exports = router;
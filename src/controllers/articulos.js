const database = require('../config/database');
const mysql2 = require('mysql2');

const todosArticulos = (req, res) => {
    const readQuery = `SELECT * FROM articulos`;

    const query = mysql2.format(readQuery);

    database.query(query, (err, result) => {
        if (err) throw console.log(err);
        console.log("todosArticulos = " + result[0].json);

        if (result[0] !== undefined) {
            res.json(result);
        } else {
            res.json({ message: 'No encontrado' });
        }

    })
}

module.exports = { todosArticulos };
const database = require('../config/database');
const mysql2 = require('mysql2');

const todasSolicitudes = (req, res) => {
    const readQuery = `SELECT * FROM solicitudes`;

    const query = mysql2.format(readQuery);

    database.query(query, (err, result) => {
        if (err) throw console.log(err);
        console.log('todasSolicitudes = ' + result[0])

        if (result[0] !== undefined) {
            res.json(result[0]);
        } else {
            res.json({ message: 'No encontrado' });
        }
    })
}

module.exports = {
    todasSolicitudes
}
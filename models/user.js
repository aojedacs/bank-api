const db = require('../config/db');
const bcrypt = require('bcryptjs');


// Función para obtener todos los usuarios
const getAllUsers = (callback) => {
  db.query('SELECT * FROM USERS', (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

const createUser = (first_name, last_name, email, password, callback) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return callback(err, null);
      }
      
      // Guardar el usuario en la base de datos
      const query = 'INSERT INTO USERS (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
      db.query(query, [first_name, last_name, email, hashedPassword], (err, result) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, result);
      });
    });
  };


module.exports = { getAllUsers, createUser };

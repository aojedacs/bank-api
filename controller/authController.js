const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const register = (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  User.createUser(first_name, last_name, email, password, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error al registrar usuario" });
    }

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son requeridos" });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
      );

      res.status(200).json({ token });
    });
  });
};

module.exports = { register, login };

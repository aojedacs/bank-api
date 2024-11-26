const User = require("../models/user");


const getUsers = (req, res) => {
  User.getAllUsers((err, users) => {
    if (err) {
      return res.status(500).json({ message: "Error al obtener usuarios" });
    }
    res.status(200).json(users);
  });
};




module.exports = { getUsers};

const loginController = require("../../controllers/user/login");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginHandler(req, res) {
  const { email, password } = req.body;
  try {
    const response = await loginController.getUserByEmail(email, password);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error en el inicio de sesión:', error.message);
    res.status(500).json({ error: error.message }); 
  }
}

module.exports = loginHandler;

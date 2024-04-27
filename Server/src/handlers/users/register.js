const { registerController }  = require('../../controllers/user/register');

async function registerHandler(req, res) {
  const { email, password, name, nickname } = req.body;

  try {
    const response = await registerController(email, password, name, nickname);

    // Puedes realizar otras acciones aquí, como enviar un correo de bienvenida, etc.

    res.status(201).json(response);
  } catch (error) {
    console.error('Error en el registro:', error.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}



module.exports = { registerHandler };

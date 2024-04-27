const { User } = require("../../../DB_connection");


exports.verifyIdToken = async (user) => {
    try {
      const userId = await User.findByPk(user);
  
      return userId;
    } catch (error) {
      throw new Error("Error al iniciar sesión");
    }
  };
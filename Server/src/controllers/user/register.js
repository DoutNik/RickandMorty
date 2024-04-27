const { User } = require("../../../DB_connection");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../../utils/jwtGenerator");

async function registerController(email, password, name, nickname) {
  if (!name || !email || !password || !nickname) {
    throw new Error("Faltan datos");
  }

  
  const checkEmail = await User.findOne({ where: { email: email } });
  const checkNickname = await User.findAll({
    where: {
      nickname: nickname,
    },
  });
  const checkUsername = await User.findAll({
    where: {
      name: name,
    },
  });
  if (checkEmail !== null) {
    throw new Error("Email already registered");
  } else if (checkNickname.length !== 0) {
    throw new Error("Nickname already registered");
  } else if (checkUsername.length !== 0) {
    throw new Error("Username already registered");
  } else {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        email,
        password: hashedPassword,
        name,
        nickname,
      });
      const token = jwtGenerator(user.id)

      return { user, token };
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      throw error;
    }
  }
}



module.exports = { registerController };

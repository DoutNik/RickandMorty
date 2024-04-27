const { User } = require("../../../DB_connection");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../../utils/jwtGenerator");


async function getUserByEmail(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("The email entered does not exist in our database. Please try another one or register a new one.");
  } else {
    try {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error("La contraseña es incorrecta");
      } else {
        const token = jwtGenerator(user.id);
        return { user, token };
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { getUserByEmail };

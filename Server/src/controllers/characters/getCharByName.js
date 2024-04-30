const axios = require("axios");
const { Characters } = require("../../../DB_connection");
const { Op } = require("sequelize");


async function getCharByName(req, res) {
  const { name } = req.params;
  try {
    const character = await Characters.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    if (character.length >= 1) {
      res.status(200).json(character);
    } else {
      res.status(204).send();
    } 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getCharByName;

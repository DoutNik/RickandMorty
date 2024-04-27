const getAllCharactersController = require("../../controllers/characters/getAllCharacters");

const getAllCharactersHandler = async (req, res) => {
  try {
    const characters = await getAllCharactersController();
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getAllCharactersHandler };
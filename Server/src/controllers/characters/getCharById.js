const axios = require("axios");

const URL = "https://rickandmortyapi.com/api/character/";

async function getCharById(req, res) {
  const { id } = req.params;
  try{
  const response = await axios(`${URL}/${id}`)

  if (response.data) {
    const { id, name, gender, species, location, origin, image, status } = response.data;

    const character = {
      id: id,
      name: name,
      gender: gender,
      species: species,
      origin: origin?.name,
      location: location?.name,
      image: image,
      status: status,
    };

    res.status(200).json(character);
    } else {
      res.status(404).json("Character not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = getCharById;
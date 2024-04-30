const axios = require("axios");
const { Location } = require("../../../DB_connection");

async function getAllLocations(req, res) {
  try {
    const location = await Location.findAll();
    location ? res.status(200).json(location) : res.status(400).send( error.message );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getAllLocations;
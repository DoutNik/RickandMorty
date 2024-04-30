const axios = require("axios");
const { Episode } = require("../../../DB_connection");

async function getAllEpisodes(req, res) {
  try {
    const episodes = await Episode.findAll();
    episodes ? res.status(200).json(episodes) : res.status(400).send( error.message );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getAllEpisodes;
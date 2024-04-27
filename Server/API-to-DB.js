const axios = require('axios');
const { Character } = require('./models');

async function fetchCharacters(url) {
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error('Error al obtener personajes:', error);
    return [];
  }
}

async function insertCharactersIntoDatabase() {
  try {
    const apiUrl = 'https://rickandmortyapi.com/api/character';
    let nextPageUrl = apiUrl;
    while (nextPageUrl) {
      const characters = await fetchCharacters(nextPageUrl);
      for (const character of characters) {
        await Character.findOrCreate({
          where: { name: character.name },
          defaults: {
            name: character.name,
            status: character.status,
            species: character.species,
            gender: character.gender,
            originName: character.origin.name,
            locationName: character.location.name,
            image: character.image,
          },
        });
      }
      nextPageUrl = characters.info.next;
    }
    console.log('Todos los personajes han sido insertados en la base de datos.');
  } catch (error) {
    console.error('Error al insertar personajes en la base de datos:', error);
  }
}

module.exports = insertCharactersIntoDatabase;
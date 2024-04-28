const { Location } = require("./DB_connection");
const locationData = require("./API/locations.json");

const { Episode } = require("./DB_connection");
const episodesData = require("./API/episodes.json");

const { Characters } = require("./DB_connection");
const charactersData = require("./API/characters.json");

const { CharacterEpisode } = require("./DB_connection");
const { where } = require("sequelize");

const extractIdFromUrl = (url) => {
  const idRegex = /\/(\d+)$/; // Expresión regular para extraer el ID al final de la URL
  const match = url.match(idRegex);
  return match ? match[1] : null; // Retorna el ID extraído o null si no se encuentra
};

const insertDataIntoDatabase = async (
  locationData,
  episodesData,
  charactersData
) => {
  try {
    for (const location of locationData) {
      const { id, name, type, dimension, residents, url } = location;
      const residentsId = residents.map((url) => extractIdFromUrl(url))
      const [newLocation, created] = await Location.findOrCreate({
        where: { id: id },
        defaults: { name: name, type: type, dimension: dimension, residents: residentsId },
      });
    }
    console.log("Localidades transfer SUCCESS");

    for (const character of charactersData) {
      const locationId = extractIdFromUrl(character.location.url);
      const [newCharacter, created] = await Characters.findOrCreate({
        where: { id: character.id },
        defaults: {
          name: character.name,
          status: character.status,
          species: character.species,
          type: character.type,
          gender: character.gender,
          origin_name: character.origin.name,
          location_name: character.location.name,
          locationId: locationId,
          image: character.image,
        },
      });
      if (character.episode.length > 0) {
        const episodes = await Episode.findAll({
          where: { id: character.episode.map((url) => extractIdFromUrl(url)) },
        });
        await newCharacter.setEpisodes(episodes);
      }
    }
    console.log("Characters transfer SUCCESS");

    for (const episode of episodesData) {
      // Insertar episodio y obtener instancia creada
      const [newEpisode, created] = await Episode.findOrCreate({
        where: { id: episode.id },
        defaults: {
          name: episode.name,
          air_date: episode.air_date,
          episode: episode.episode,
        },
      });

      // Asociar episodio con personajes
      if (episode.characters.length > 0) {
        const characters = await Characters.findAll({
          where: { id: episode.characters.map((url) => extractIdFromUrl(url)) },
        });
        await newEpisode.setCharacters(characters);
      }
    }
    console.log("Episodes transfer SUCCESS");

    console.log("Datos insertados exitosamente en la base de datos.");
  } catch (error) {
    console.error("Error al insertar datos en la base de datos:", error);
  }
};

insertDataIntoDatabase(locationData, episodesData, charactersData);

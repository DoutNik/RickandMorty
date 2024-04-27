const { Characters } = require('../../../DB_connection');

exports.getAllCharactersController = async () => {
    try {
    const allCharacters = await Characters.findAll();
    return allCharacters;
    } catch (error) {
        console.error("Error en controller al obtener personajes", error.message)
    throw error;
    }
};
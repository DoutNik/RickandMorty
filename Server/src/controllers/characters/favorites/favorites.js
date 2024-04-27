const { Favorite } = require("../../../../DB_connection")

async function getFavoritesController() {
    try {
      const favorites = await Favorite.findAll();
    return favorites;
    } catch (error) {
      console.error('Error al obtener favoritos', error.message);
      throw error;
    }
  };
  
  module.exports = { getFavoritesController };




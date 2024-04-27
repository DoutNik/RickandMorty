const { getFavoritesController } = require("../../../controllers/characters/favorites/favorites")

const getFavoritesHandler = async (req, res) => {
    try {
      const favorites = await getFavoritesController();
      return res.status(200).json(favorites);
    } catch (error) {
      console.error('Error al intentar ejecutar la busqueda', error);
      return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
  };
  
  module.exports = {getFavoritesHandler};
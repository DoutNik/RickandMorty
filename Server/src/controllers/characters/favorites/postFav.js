const { Favorite } = require("../../../../DB_connection")

const postFav = async (req, res) => {
    const {id, name, origin, status, image, species, gender } = req.body;
  
    // Verificar si se recibieron todos los datos
    if (!name || !origin || !status || !image || !species || !gender || !id) {
      return res.status(401).json({ message: 'Faltan datos' });
    }
  
    try {
      // Guardar el personaje favorito en la base de datos
      const favorite = await Favorite.create({
        id,
        name,
        origin,
        status,
        image,
        species,
        gender,
      });
  
      // Buscar todos los personajes favoritos en la base de datos
      const favorites = await Favorite.findAll();
  
      // Responder con el arreglo de personajes favoritos
      return res.status(200).json(favorites);
    } catch (error) {
      console.error('Error al guardar el personaje favorito:', error);
      return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
  };
  
  module.exports = postFav;
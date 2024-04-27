const Favorite = require('../../../../DB_connection'); // Asegúrate de que la importación sea correcta

const deleteFav = async (req, res) => {
  const { id } = req.params;

  try {
    // Eliminar el personaje favorito por su ID
    await Favorite.destroy({
      where: { id },
    });

    // Buscar todos los personajes favoritos en la base de datos después de la eliminación
    const favorites = await Favorite.findAll();

    // Responder con el arreglo de personajes favoritos actualizado
    return res.status(200).json(favorites);
  } catch (error) {
    console.error('Error al eliminar el personaje favorito:', error);
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

module.exports = deleteFav;

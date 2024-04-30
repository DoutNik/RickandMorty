const {Router} = require("express");
const authorization = require("../middleware/authorization.js");

//______________________PERSONAJES__________________________-
const getCharById = require("../controllers/characters/getCharById.js");
const getCharByName = require("../controllers/characters/getCharByName.js");
//______________________FAVORITOS___________________________-
const postFav = require("../controllers/characters/favorites/postFav.js");
const deleteFav = require("../controllers/characters/favorites/deleteFav.js")
const { getFavoritesHandler } = require("../handlers/characters/favorites/favorites.js")
//______________________LOGIN_&_REGISTER____________________-
const loginHandler = require("../handlers/users/login.js")
const { registerHandler } = require('../handlers/users/register.js');
const { getAllCharactersHandler } = require("../handlers/characters/getAllCharacters.js")
const  verifyIdTokenHandler  = require("../handlers/users/verifyIdToken.js")

const mainRouter = Router();

//----------------USERS---------------
mainRouter.post("/login" , loginHandler)
mainRouter.post('/register', registerHandler);
mainRouter.get('/verifyIdToken', authorization, verifyIdTokenHandler)
mainRouter.get("/verify", authorization, async (req, res) => {
    try {
      return res.status(200).json(true);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  });

//-------------CHARACTERS---------------
mainRouter.get("/getAllCharacters", getAllCharactersHandler);
mainRouter.get("/character/:id", getCharById);
mainRouter.get("/getCharacterByName/:name", getCharByName)
mainRouter.get("/allFavorites", getFavoritesHandler)
mainRouter.post("/fav", postFav);
mainRouter.delete("/fav/:id", deleteFav);

module.exports = mainRouter;

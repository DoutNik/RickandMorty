require('dotenv').config();
const { Sequelize } = require('sequelize');
const FavoriteModel = require('./src/models/Favorite.js');
const UserModel = require('./src/models/User.js');
const CharactersModel = require('./src/models/Character.js')

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false }
);

FavoriteModel(sequelize);
UserModel(sequelize);
CharactersModel(sequelize);

const { Favorite, User, Characters } = sequelize.models;

Favorite.belongsToMany(User, { through: 'User_favorites' });
User.belongsToMany(Favorite, { through: 'User_favorites' });

Characters.belongsToMany(User, { through: 'User_characters' });
User.belongsToMany(Characters, { through: 'User_characters' });



module.exports = {
  User,
  Favorite,
  Characters,
  conn: sequelize,
};

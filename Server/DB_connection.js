require("dotenv").config();
const { Sequelize } = require("sequelize");
const FavoriteModel = require("./src/models/Favorite.js");
const UserModel = require("./src/models/User.js");
const CharactersModel = require("./src/models/Character.js");
const EpisodeModel = require("./src/models/Episode.js");
const LocationModel = require("./src/models/Location.js");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false }
);

FavoriteModel(sequelize);
UserModel(sequelize);
CharactersModel(sequelize);
EpisodeModel(sequelize);
LocationModel(sequelize);

const { Favorite, User, Characters, Location, Episode } = sequelize.models;

Characters.belongsTo(Location, { foreignKey: 'locationId', as: 'location' });
Characters.belongsToMany(Episode, { through: 'CharacterEpisode', foreignKey: 'characterId', as: 'episodes' });

Location.hasMany(Characters, { foreignKey: 'locationId', as: 'characters' });

Episode.belongsToMany(Characters, { through: 'CharacterEpisode', foreignKey: 'episodeId', as: 'characters' });


module.exports = {
  User,
  Favorite,
  Characters,
  Location,
  Episode,
  conn: sequelize,
};

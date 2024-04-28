const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Episode",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      air_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      episode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

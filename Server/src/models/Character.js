const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Characters",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      species: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      origin_name: {
        type: DataTypes.STRING,
        allowNull: true, // Permitir valores nulos si no se proporciona el origen
      },
      location_name: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};

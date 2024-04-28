const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Location",
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
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dimension: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      residents: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    { timestamps: false }
  );
};

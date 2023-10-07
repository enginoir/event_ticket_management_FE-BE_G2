"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Photo_event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Photo_event.belongsTo(models.eventss, { foreignKey: "id" });
    }
  }
  Photo_event.init(
    {
      eventsid: DataTypes.INTEGER,
      url: DataTypes.STRING,
      image_blob: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "Photo_event",
    }
  );
  return Photo_event;
};

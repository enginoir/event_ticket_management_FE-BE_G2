"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Events.hasMany(models.User, { foreignKey: "userId" });
      Events.hasMany(models.Photo_event, {
        foreignKey: "eventsid",
      });
    }
  }
  Events.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.INTEGER,
      venue: DataTypes.STRING,
      category: DataTypes.INTEGER,
      date_start: DataTypes.DATEONLY,
      date_end: DataTypes.DATEONLY,
      time_start: DataTypes.TIME,
      time_end: DataTypes.TIME,
      description: DataTypes.TEXT,
      ticket_price: DataTypes.INTEGER,
      ticket_stock: DataTypes.INTEGER,
      event_userid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Events",
    }
  );
  return Events;
};

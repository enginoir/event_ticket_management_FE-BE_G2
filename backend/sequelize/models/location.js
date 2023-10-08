'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Location.hasMany(models.Event, { foreignKey: "location" });
      // Location.hasMany(models.User, { foreignKey: "location" });
    }
  }
  Location.init({
    location_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};
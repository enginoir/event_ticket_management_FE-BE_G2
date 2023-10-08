'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  Promotion.init({
    event_id: DataTypes.INTEGER,
    promo_code: DataTypes.TEXT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    disc_price: DataTypes.INTEGER,
    quota: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Promotion',
  });
  return Promotion;
};
module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define('promotion', {
    event_id: {
      type: DataTypes.INTEGER,
    },
    promo_code: {
      type: DataTypes.TEXT,
    },
    start_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
    },
    disc_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quota: {
      type: DataTypes.INTEGER,
    },
  });
  return Promotion;
};

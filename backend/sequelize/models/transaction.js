'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.Transaction.belongsTo(models.User, { foreignKey: "user_id" });
      // models.Transaction.belongsTo(models.Event, { foreignKey: "event_id" });
      // models.Transaction.hasMany(models.User, { foreignKey: "id" });
      // models.Transaction.hasMany(models.Promotion, { foreignKey: "id" });
    }
  }
  Transaction.init({
    total_price: DataTypes.INTEGER,
    total_ticket: DataTypes.INTEGER,
    transaction_date: DataTypes.DATEONLY,
    promo_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};
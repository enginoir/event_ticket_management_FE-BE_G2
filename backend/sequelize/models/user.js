'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // User.hasMany(models.Event, { foreignKey: "userid" });
      // User.hasMany(models.Review, { foreignKey: "userid" });
      // User.belongsTo(models.Transaction, { foreignKey: "id" });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    referralcode: { type: DataTypes.STRING, unique: true },
    is_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    birthdate: DataTypes.DATEONLY,
    is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    reset_password_token: DataTypes.STRING,
    verify_token: DataTypes.STRING,
    points: DataTypes.INTEGER,
    failed_attempts: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
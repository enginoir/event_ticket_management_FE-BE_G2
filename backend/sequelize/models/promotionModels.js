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

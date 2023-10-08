"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected!");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.promotion = require("./promotion")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);
db.Location = require("./location")(sequelize, Sequelize);
db.Events = require("./events")(sequelize, Sequelize);

db.Location.hasMany(db.Events, {
  foreignKey: "location",
});

db.Events.hasMany(db.Photo_event, {
  foreignKey: "eventsid",
  as: "Photo_event",
});
db.Photo_event.belongsTo(db.Events, { foreignKey: "eventsid" });

db.User.hasMany(db.Events, { foreignKey: "event_userid" });
db.User.hasMany(db.Transaction, { foreignKey: "user_id" });
db.Events.hasMany(db.Photo_event, { foreignKey: "eventsid" });
db.Location.hasMany(db.Event, {
  foreignKey: "location",
});
db.Event.belongsTo(db.Location, { foreignKey: "location" });
db.User.hasMany(db.Event, { foreignKey: "event_creator_userid" });
db.Event.belongsTo(db.User, { foreignKey: "event_creator_userid" });
db.User.hasMany(db.Ticket, { foreignKey: "userid" });
db.User.hasMany(db.Transaction, { foreignKey: "user_id" });
db.Transaction.belongsTo(db.User, { foreignKey: "user_id" });

db.Transaction.belongsTo(db.Event, { foreignKey: "event_id" });
db.Event.hasMany(db.Transaction, { foreignKey: "event_id" });

db.Transaction.associate(db);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;

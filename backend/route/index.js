const userRouter = require("./user_router");
const locationRouter = require("./location_router.js");
const eventRouter = require("./eventsRouter");
const uploadRouter = require("./uploadRouter");

module.exports = {
    userRouter: userRouter,
    locationRouter: locationRouter,
    eventRouter: eventRouter,
  uploadRouter: uploadRouter,
};

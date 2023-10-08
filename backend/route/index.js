const userRouter = require("./user_router");
const locationRouter = require("./location_router.js");
const eventRouter = require("./eventsRouter");
const uploadRouter = require("./uploadRouter");
const promotionRouter = require("./promotionRouter");

module.exports = {
    promotionRouter: promotionRouter,
    userRouter: userRouter,
    locationRouter: locationRouter,
    eventRouter: eventRouter,
    uploadRouter: uploadRouter,
};

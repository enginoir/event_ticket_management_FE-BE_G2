const express = require("express");
const route = express.Router();
const Events = require("../sequelize/models");
const uploader = require("../middlewares/uploader");
const uploaderController = require("../controller/uploaderController");

route.get("/events", async (req, res) => {
  try {
    const events = await Events.findAll();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

route.patch(
  "/:id",
  uploader({
    destinationFolder: "/public",
    prefix: "IMG-EVENT-UPDATE",
    filetype: "image",
  }).array("image"),
  uploaderController.updateEvent.bind(uploaderController),
  uploaderController.getEventsById.bind(uploaderController)
);

route.delete(
  `/:id`,
  uploaderController.deleteEventWithImage.bind(uploaderController)
);

route.post("/", async (req, res) => {
  try {
    const eventData = req.body;

    const event = await Events.create(eventData);

    res.status(201).json(event);
  } catch (error) {
    console.log("Error creating event :", error);
    res.status(500).json({ error: "Unable to create event" });
  }
});

module.exports = route;

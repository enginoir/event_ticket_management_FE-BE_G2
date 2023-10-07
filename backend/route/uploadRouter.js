const express = require("express");
const uploaderController = require("../controller/uploaderController");
const route = express.Router();
const { uploader } = require("../middlewares/uploader");
const controller = require("../controller/Controller");

route.get("/", uploaderController.getAll.bind(uploaderController));
route.post(
  "./upload-photo",
  uploader({
    destinationFolder: "/public",
    prefix: "EVENT-IMG",
    filetype: "image",
  }).single("image"),
  uploaderController.addPhotoEvent.bind(uploaderController)
);
route.patch(
  "/:id",
  uploaderController.update.bind(uploaderController),
  uploaderController.getById.bind(uploaderController)
);

module.exports = route;

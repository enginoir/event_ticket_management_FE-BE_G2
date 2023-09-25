const disc_repController = require(`../controller/discussion_reply_Controller`);
const api_key_verificator = require("../middlewares/api_KeyVerificator");
const authVerificator = require("../middlewares/authVerificator");
const delete_modify_verificator = require("../middlewares/delete_modify_discussionReply_verificator");
const route = require(`express`).Router();

route.get(`/`, disc_repController.getAll.bind(disc_repController));
route.get(`/:id`, disc_repController.getById.bind(disc_repController));
route.post(
  `/`,
  api_key_verificator,
  authVerificator,
  disc_repController.create.bind(disc_repController)
);
route.patch(
  `/:id`,
  api_key_verificator,
  authVerificator,
  delete_modify_verificator,
  disc_repController.update.bind(disc_repController),
  disc_repController.getById.bind(disc_repController)
);
route.delete(
  `/:id`,
  api_key_verificator,
  authVerificator,
  delete_modify_verificator,
  disc_repController.delete.bind(disc_repController)
);

module.exports = route;

const transactionController = require("../controller/transactionController");
const {
  transactionValidationRules,
  validate,
} = require("../middlewares/transaction_validator");
const route = require("express").Router();

route.get("/", transactionController.getAll.bind(transactionController));
route.get(
  "/:id",
  transactionController.getTransactionById.bind(transactionController)
);


route.post(
  "/",
  transactionValidationRules(),
  validate,
  transactionController.createTransaction.bind(transactionController)
);

module.exports = route;

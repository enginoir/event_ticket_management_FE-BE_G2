const userController = require(`../controller/userController`);
const {
    userValidationRules,
    validate,
} = require("../middlewares/register_validator.js");
const router = require(`express`).Router();
const api_key_verificator = require("../middlewares/api_KeyVerificator");

// router.get(`/`, userController.getAll.bind(userController));

router.get("/token", userController.getUserByToken.bind(userController));

router.get(
    `/:id`,
    api_key_verificator,
    userController.getById.bind(userController)
);

router.post(`/`, userController.create.bind(userController));
router.post(
    `/new_account`,
    userValidationRules(),
    validate,
    api_key_verificator,
    userController.register.bind(userController)
);
router.post(
    `/token`,
    api_key_verificator,
    userController.keepLogin.bind(userController)
);
router.post(
    `/new_account_verification/:id`,
    api_key_verificator,
    userController.sendVerification.bind(userController)
);
router.post(
    `/verify_user/:token`,
    api_key_verificator,
    userController.verifyAccount.bind(userController)
);

router.post(
    `/auth`,
    api_key_verificator,
    userController.login.bind(userController)
);

router.post(`/topup`, userController.topUp.bind(userController));

router.patch(
    `/:id`,
    api_key_verificator,
    userController.update.bind(userController),
    userController.getById.bind(userController)
);
router.delete(
    `/:id`,
    api_key_verificator,
    userController.delete.bind(userController)
);

module.exports = router;
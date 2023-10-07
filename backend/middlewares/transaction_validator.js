const { body, validationResult } = require(`express-validator`);

const transactionValidationRules = () => {
  return [
    body("event_id").isNumeric().withMessage("event id must be a number"),
    
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorExtractor = [];
  errors.errors.map((err) => {
    errorExtractor.push({ [err.path]: err.msg });
  });
  return res.status(404).json({ errors: errorExtractor });
};

module.exports = { transactionValidationRules, validate };

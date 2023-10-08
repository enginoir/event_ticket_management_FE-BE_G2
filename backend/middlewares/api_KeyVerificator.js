const api_key_verificator = (req, res, next) => {
  try {
    if (req.headers["api-key"] !== "passifyv2")
      throw new Error("Invalid API Key");
    next();
  } catch (err) {
    return res.status(408).send(err?.message);
  }
};

module.exports = api_key_verificator;

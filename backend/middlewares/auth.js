const jwt = require('jsonwebtoken');
const db = require("../sequelize/models");

const verifyToken = async (req, res, next) => {
    try {
        const { token } = req;
        const { userid } = req.body;
        const data = jwt.verify(token, process.env.jwt_secret);
        if (req.headers["api-key"] !== "passifyv2") {
            throw new Error("Invalid API Key");
        }

        if (token === "null" || !token) {
            return res.status(401).send("Unauthorized Request");
        }

        if (data.id !== userid) throw new Error("Your credential does not match");
        next();
        } catch (err) {
            return res.status(400).send(err?.message);
        }
};

module.exports = verifyToken;
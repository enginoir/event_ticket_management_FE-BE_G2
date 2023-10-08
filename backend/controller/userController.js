"use strict"
const { where } = require("sequelize");
const db = require("../sequelize/models");
const Controller = require("./Controller");
const bcrypt = require("bcrypt");
// const mailer = require("../lib/nodemailer");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const mustache = require(`mustache`);

class UserController extends Controller {
    constructor(modelname) {
        super(modelname);
    }

    async register(req, res) {
        const { email, reference } = req.body;
        const t = await db.sequelize.transaction();
        try {
        if (req.body.password !== req.body.confirmPassword)
            throw new Error(
            "Your credentials does not match"
            );
        await this.db
            .findOne(
            {
                where: { email },
            },
            { transaction: t }
            )
            .then((result) => {
            if (result) throw new Error(`Email has been used`);
            });

        if (reference) {
            await this.db
            .findOne(
                {
                where: { referralcode: reference },
                },
                { transaction: t }
            )
            .then(async (result) => {
                if (!result?.dataValues.id)
                throw new Error(`Invalid Referral Code`);
                result.dataValues.points += 20000;
                req.body.points = 20000;
                await this.db.update(
                { ...result.dataValues },
                { where: { id: result.dataValues.id } },
                { transaction: t }
                );
            });
        }
        req.body.password = await bcrypt.hash(req.body.password, 13);
        const result = await this.db.create({ ...req.body }, { transaction: t });
        await t.commit();
        await this.sendVerification({ params: { id: result.id } }, res);
        } catch (err) {
        await t.rollback;
        res.status(400).send(err?.message);
        }
    }

    async sendVerification(req, res) {
        const { id } = req.params;
        const user = await this.db.findOne({
        where: { id },
        });
        // const template = fs
        // .readFileSync(__dirname + "/../template/verify.html")
        // .toString();

        const token = jwt.sign(
        { id: user.id, is_verified: user.is_verified },
        process.env.jwt_secret,
        { expiresIn: "5min" }
        );
        const renderTemplate = mustache.render(template, {
        username: user.dataValues.username,
        fullname: user.dataValues.email,
        verify_url: process.env.verify_url + `${id}/` + token,
        });

        // await mailer({
        // subject: "Passify.io V2.0 Account Verification",
        // to: user.email,
        // html: renderTemplate,
        // });
        await this.db.update({ verify_token: token }, { where: { id } });

        return res.send("Account Verification via Email has been sent");
    }

    async verifyAccount(req, res) {
        try {
        const { token } = req.params;
        const { id } = req.query;
        const user = await this.db.findByPk(id);
        const payload = jwt.verify(token, process.env.jwt_secret);
        console.log(token, id, user.dataValues.verify_token);
        if (token != user.dataValues.verify_token)
            throw new Error(`Your credentials does not match`);
        if (payload.is_verified)
            throw new Error("This account has been verified");
        await this.db.update(
            { is_verified: true, verify_token: "" },
            { where: { id: payload.id } }
        );
        return res.send(`User has been verified`);
        } catch (err) {
        return res.status(405).send(err?.message);
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        await db.User.findOne({
        where: {
            email,
        },
        })
        .then(async (result) => {
            if (!result) throw new Error("wrong email or password");
            const isValid = await bcrypt.compare(
            password,
            result.dataValues.password
            );

            if (!isValid) {
            throw new Error("wrong email or password");
            }
            delete result.dataValues.password;

            const payload = {
            id: result.dataValues.id,
            is_verified: result.dataValues.is_verified,
            };

            const token = jwt.sign(payload, process.env.jwt_secret, {
            expiresIn: "15min",
            });

            return res.send({ token, user: result });
        })
        .catch((err) => {
            res.status(500).send(err?.message);
        });
    }

    async keepLogin(req, res) {
        try {
        const { token } = req;
        const payload = jwt.verify(token, process.env.jwt_secret);
        if (!payload?.id) throw new Error("Invalid Token");
        const user = await this.db.findByPk(payload.id);
        delete user.dataValues.password;
        const newToken = jwt.sign(
            {
            id: user.dataValues.id,
            is_verified: user.dataValues.is_verified,
            },
            process.env.jwt_secret,
            { expiresIn: "15min" }
        );

        return res.send({ token: newToken, user: user.dataValues });
        } catch (err) {
        res.status(400).send(err?.message);
        }
    }

    async getUserByToken(req, res) {
        try {
        const { token } = req.query;

        const payload = jwt.verify(token, process.env.jwt_secret);

        await this.db
            .findByPk(payload.id)
            .then((result) => res.send(result.dataValues))
            .catch((err) => res.send(err));
        } catch (err) {
        return res.status(400).send(err?.message);
        }
    }

//     async topUp(req, res) {
//         try {
//         const { token } = req;
//         const userId = jwt.verify(token, process.env.jwt_secret);
//         const findUser = await db.User.findByPk(userId.id);

//         const inputPoints = req.body.points;
//         let newPoints = findUser.points;
//         newPoints += inputPoints;
//         // console.log(newPoints);

//         findUser.update({ points: newPoints });

//         res.json({
//             status: 200,
//             message: "Berhasil top up",
//             findUser,
//         });
//         } catch (err) {
//         res.json({
//             status: 400,
//             message: err?.message,
//         });
//         }
//     }
}

module.exports = new UserController(`User`);

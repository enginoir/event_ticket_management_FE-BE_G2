const { where } = require("sequelize");
const db = require("../sequelize/models");
const Controller = require("./Controller");
const user = require("../sequelize/models/user");
const jwt = require("jsonwebtoken");

class TransactionController extends Controller {
  constructor(modelname) {
    super(modelname);
  }

  async getTransactionById(req, res) {
    try {
      const transactionData = await this.db.findByPk(req.params.id, {
        include: [{ model: db.User }, { model: db.Event }],
      });
      res.status(200).send(transactionData);
    } catch (error) {
      res.status(500).send(error?.message);
    }
  }

  async createTransaction(req, res) {
    try {
      await db.sequelize.transaction(async (t) => {
        const { event_id } = req.body;
        const { token } = req;
        console.log(token);

        const idUser = jwt.verify(token, process.env.jwt_secret);
        console.log("idUser", idUser);
        const user_id = idUser.id;

        const userData = await db.User.findByPk(user_id, { transaction: t });
        if (!userData) throw new Error("user not found");
        // console.log("userData", userData);

        const eventData = await db.Event.findByPk(event_id, { transaction: t });
        if (!eventData) throw new Error("event not found");
        // console.log("eventData", eventData);

        if (eventData.dataValues.isfree == false) {
          if (req.body.ticket_price) {
            //cek apakah saldo cukup
            if (userData.points < eventData.ticket_price)
              return res.status(400).send("saldo tidak cukup");

            // cek apakah stok masih ada
            if (eventData.ticket_stock < 1)
              return res.status(400).send("tiket sudah habis");
            await eventData.increment({ ticket_stock: -1 });

            //ngurangin saldo user
            await userData.increment({
              points: -eventData.ticket_price,
            });
            const transactionData = await this.db.create({
              user_id: user_id,
              event_id: event_id,
              total_price: eventData.ticket_price,
            });
            return res.status(201).send(transactionData);
          } else {
            //cek apakah saldo cukup
            if (userData.points < eventData.ticket_price)
              return res.status(400).send("saldo tidak cukup");

            // cek apakah stok masih ada
            if (eventData.ticket_stock < 1)
              return res.status(400).send("tiket sudah habis");
            await eventData.increment({ ticket_stock: -1 });

            //ngurangin saldo user
            await userData.increment({
              points: -eventData.ticket_price,
            });
            const transactionData = await this.db.create({
              user_id: user_id,
              event_id: event_id,
              total_price: eventData.ticket_price,
            });
            return res.status(201).send(transactionData);
          }
        } else {
          const transactionData = await this.db.create({
            user_id: user_id,
            event_id: event_id,
            total_price: 0,
          });
          res.status(201).send({
            message: "Event ini gratis, tiket anda sudah dibuat",
            data: transactionData,
          });
        }
      });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  }

  async getUserByEvent(req, res) {
    try {
      const userData = await db.User.findByPk(req.params.id, {
        include: [
          {
            model: db.Transaction,
            include: [{ model: db.Event, attributes: ["name"] }],
          },
        ],
      });
      res.status(200).send(userData);
    } catch (error) {
      res.status(500).send(error?.message);
    }
  }

  async getEventByUser(req, res) {
    try {
      const eventData = await db.Event.findByPk(req.params.id, {
        include: [
          {
            model: db.Transaction,
            attributes: ["id"],
            include: [{ model: db.User, attributes: ["id", "username"] }],
          },
        ],
      });
      res.status(200).send(eventData);
    } catch (error) {
      res.status(500).send(error?.message);
    }
  }
}

module.exports = new TransactionController(`Transaction`);

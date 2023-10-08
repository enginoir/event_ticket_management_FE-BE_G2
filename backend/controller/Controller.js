//update isi controller nanti
const db = require('../sequelize/models');

class Controller {
  constructor(modelname) {
    this.modelname = modelname;
    this.db = db[modelname];
  }
  getAll(req, res) {
    this.db
      .findAll()
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
  getById(req, res) {
    const { id } = req.params;
    this.db
      .findByPk(id)
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
  create(req, res) {
    this.db
      .create({ ...req.body })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
  update(req, res, next) {
    const { id } = req.params;
    this.db
      .update({ ...req.body }, { where: { id } })
      .then(() => next())
      .catch((err) => res.status(500).send(err?.message));
  }
  delete(req, res) {
    const { id } = req.params;
    this.db
      .destroy({ where: { id } })
      .then(() => res.send({ message: `${this.modelname} deleted` }))
      .catch((err) => res.status(500).send(err?.message));
  }
}

module.exports = Controller;

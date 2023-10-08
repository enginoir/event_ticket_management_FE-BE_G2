const db = require('../sequlize/models/');

//create main model
const Promotion = db.promotion;

//main works
//1. create promotion
const addPromotion = async (req, res) => {
  let info = {
    event_id: req.body.event_id,
    promo_code: req.body.promo_code,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    disc_price: req.body.disc_price,
    quota: req.body.quota,
  };
  const promotion = await Promotion.create(info);
  res.status(200).send(promotion);
  console.log(promotion);
};

//2. get all promotion
const getAllPromotion = async (req, res) => {
  let promotion = await Promotion.findAll({});
  res.status(200).send(promotion);
};

//3. get single promotion
const getOnePromotion = async (req, res) => {
  let id = req.params.id;
  let promotion = await Promotion.findOne({ where: { id: id } });
  res.status(200).send(promotion);
};

//4. Update promotion
const updatePromotion = async (req, res) => {
  let id = req.params.id;
  let promotion = await Promotion.update(req.body, { where: { id: id } });
  res.status(200).send(promotion);
};

//5. Delete promotion by id
const deletePromotion = async (req, res) => {
  let id = req.params.id;
  await Promotion.destroy({ where: { id: id } });
  res.status(200).send('Code promotion is Deleted!');
};

module.exports = {
  addPromotion,
  getAllPromotion,
  getOnePromotion,
  updatePromotion,
  deletePromotion,
};

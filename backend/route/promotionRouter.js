const promotionController = require('../controller/promotionController.js');

const router = require('express').Router();
router.post('/addPromo', promotionController.addPromotion);
router.get('/allPromo', promotionController.getAllPromotion);

router.get('/:id', promotionController.getOnePromotion);
router.put('/:id', promotionController.updatePromotion);
router.delete('/:id', promotionController.deletePromotion);

module.exports = router;

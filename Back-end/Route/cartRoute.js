const express = require('express');
const router = express.Router();
const cartController = require('../Controller/cartController');
const {authMiddleware} = require('../Middleware/authMiddleware'); 

router.get('/', authMiddleware, cartController.getCartByUserId);
router.post('/add/:productId', authMiddleware, cartController.addItemToCart);
router.patch('/update', authMiddleware, cartController.updateItemQuantity);
router.patch('/updatesubtotal', authMiddleware, cartController.applyVoucherToCart);
router.delete('/remove', authMiddleware, cartController.removeItemFromCart);
router.delete('/clear', authMiddleware, cartController.clearCart);

module.exports = router;
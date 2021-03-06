const express = require('express');
const router = express.Router();
const inventoryTransactionsController = require('../controllers/inventoryTransactionsController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleProduction = require('../middlewares/verifyRoleProduction');

router.get('/inventoryTransactions', [userExtractor, verifyRoleProduction], inventoryTransactionsController.getInventoryTransactions);

module.exports = router;
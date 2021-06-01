const express = require("express");
const { addPurchase_post } = require("../controllers/purchaseController");
const router = express.Router();

router.get("/", addPurchase_post);

module.exports = router;

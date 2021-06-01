const express = require("express");
const { products_get } = require("../controllers/productsController");
const router = express.Router();

router.get("/", products_get);

module.exports = router;

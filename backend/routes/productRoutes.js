const express = require("express");
const {
  getProduct,
  getProducts,
} = require("../controllers/productsController");

const router = new express.Router();

//GET ROUTE FOR ALL PRODUCTS
router.route("/products").get(getProducts);

//GET ROUTE FOR SINGLE PRODUCT
router.route("/product/:id").get(getProduct);

module.exports = router;

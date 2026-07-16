const express = require("express");

const {
  createCart,
  getCart,
  addItemToCart,
} = require("../controllers/cartController");

const router = express.Router();

// Create a new cart
router.post("/", createCart);

// Get cart by ID
router.get("/:id", getCart);

// Add item to cart
router.post("/:id/items", addItemToCart);

module.exports = router;
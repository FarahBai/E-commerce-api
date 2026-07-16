const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Create a new cart
const createCart = async (req, res, next) => {
  try {
    const cart = await Cart.create({
      items: [],
    });

    res.status(201).json({
      message: "Cart created successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// Get cart by ID
const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id).populate(
      "items.product"
    );

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// Add item to cart
const addItemToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items.push({
      product: productId,
      quantity,
    });

    await cart.save();

    const updatedCart = await Cart.findById(req.params.id).populate(
      "items.product"
    );

    res.status(200).json({
      message: "Item added to cart",
      cart: updatedCart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCart,
  getCart,
  addItemToCart,
};
const express = require("express");
require("dotenv").config();

const connectDB = require("./db");

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("E-Commerce API is running...");
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Connect Database and Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
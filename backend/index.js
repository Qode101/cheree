// server.js
const express = require("express");
const dotenv = require("dotenv");
const productRouter = require("./routes/productRoutes");
const { logResponseDetails } = require("./middleware/logMiddleware");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(express.json());
app.use(logResponseDetails);

// Example route
app.get("/", (req, res) => {
  res.send("cheree is online!");
});

// Use product router
app.use("/products", productRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

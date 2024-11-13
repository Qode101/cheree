// server.js
const express = require("express");
const dotenv = require("dotenv");
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const { logResponseDetails } = require("./middleware/logMiddleware");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");

dotenv.config();
console.log(process.env.MONGODB_URI, process.env.PORT, "dev");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB connection error:", err));

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(logResponseDetails);
app.use(cors());

const api = require("./routes/api");
app.use("/api", api);

// Example route
app.get("/", (req, res) => {
  res.send("cheree is online!");
});

// Use product router
app.use("/products", productRouter);
app.use("/category", categoryRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

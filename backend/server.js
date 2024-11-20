// server
const express = require("express");
const dotenv = require("dotenv");
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const purchaseRouter = require("./routes/purchaseRoutes");
const wishListRouter = require("./routes/wishListRoutes");
const mpesaRouter = require("./routes/mpesaRoutes");
const { logResponseDetails } = require("./middleware/logMiddleware");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const paymentRouter = require("./routes/paymentRoutes");

dotenv.config();
console.log(process.env.MONGODB_URI, process.env.PORT, "devs");

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

app.get("/", (req, res) => {
  res.send("cheree is online!");
});

// Routes
app.use("/api", api); // user routes
app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/purchase", purchaseRouter);
app.use("/wishlist", wishListRouter);
app.use("/mpesa", mpesaRouter);
app.use("/orders", purchaseRouter);
app.use("/payments", paymentRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

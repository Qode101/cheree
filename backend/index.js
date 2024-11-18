// server.js
const express = require("express");
const dotenv = require("dotenv");
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const purchaseRouter = require("./routes/purchaseRoutes");
const wishListRouter = require("./routes/wishListRoutes");
const { logResponseDetails } = require("./middleware/logMiddleware");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const { handleErrors, handle404 } = require("./middleware/errorHandling");
const { AppError } = require("./utils/tryCatch");

//const cors = require("cors");

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

//app.use(cors());

const api = require("./routes/api");

// Example route
app.get("/", (req, res) => {
  res.send("cheree is online!");
});

// Routes
app.use("/api", api); // user routes
app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/purchase", purchaseRouter);
app.use("/wishlist", wishListRouter);

// handle 404
app.use(handle404);
app.use(handleErrors);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

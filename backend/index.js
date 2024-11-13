// server
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
console.log(process.env.MONGODB_URI, process.env.PORT, "dev");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB connection error:", err));

const app = express();
app.use(express.json());
app.use(cors());

const api = require("./routes/api");
app.use("/api", api);

// Routes
app.get("/", (req, res) => {
  res.send("cheree is online!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

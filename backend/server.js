// server
const express = require("express");
const dotenv = require("dotenv");
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const purchaseRouter = require("./routes/purchaseRoutes");
const wishListRouter = require("./routes/wishListRoutes");
const mpesaRouter = require("./routes/mpesaRoutes");
const api = require("./routes/api");
const { logResponseDetails } = require("./middleware/logMiddleware");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const { handleErrors, handle404 } = require("./middleware/errorHandling");
const { AppError } = require("./utils/tryCatch");

dotenv.config();
console.log(process.env.MONGODB_URI, process.env.PORT, "devs");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB connection error:", err));

const app = express();
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(logResponseDetails);

app.use(cors());

app.use(
  // alloq cors
  cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
  // Google Auth Middleware
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
  res.send("cheree is online!");
});

app.use("/auth", authRoutes);
app.use("/api", api);
app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/purchase", purchaseRouter);
app.use("/wishlist", wishListRouter);
app.use("/mpesa", mpesaRouter);
app.use("/orders", purchaseRouter);

// handle 404
app.use(handle404);
app.use(handleErrors);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

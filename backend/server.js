const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
const products = require("./data/products");
const dotenv = require("dotenv");
const connectDb = require("../backend/config/config");
const color = require("colors");
const productRoutes = require("./routes/productRoutes");
const usersRoutes = require("./routes/UserRoutes");
const orderRoutes = require("./routes/orderRoutes");
// dotnv confiq
dotenv.config();

// connecting mongodb database
connectDb();

//res object
const app = express();

// middleware bodyparser
app.use(express.json());

// productRoutes
app.use("/api", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// middleware
app.use(errorHandler);

// routing
app.get("/", (req, res) => {
  res.send("<h1> Wellcome to Node Server</h1>");
});

// port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `server running in ${process.env.NODE_ENV} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});

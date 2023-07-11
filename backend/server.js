const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
const products = require("./data/products");
const dotenv = require("dotenv");
const connectDb = require("../backend/config/config");
const color = require("colors");
const productRoutes = require("./routes/productRoutes");
const usersRoutes = require("./routes/UserRoutes");
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

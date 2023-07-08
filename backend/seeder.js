const mongoose = require("mongoose");
const dotenv = require("dotenv");
const color = require("colors");
const users = require("./data/Users");
const products = require("./data/products");
const Order = require("./models/orderModel");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const connectDb = require("./config/config");

// confiq env
dotenv.config();
connectDb();

const importData = async () => {
  try {
    // before creating db delte all data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createUser = await User.insertMany(users);
    const adminUser = createUser[0]._id;
    const sampleData = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleData);
    console.log("Data imported".bgMagenta.white);
    process.exit();
  } catch (error) {
    console.log(`${error}`.bgRed);
    process.exit(1);
  }
};

const dataDestroy = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("data destroy".bgGreen);
    process.exit();
  } catch (error) {
    console.log(`${error}`.bgRed);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  dataDestroy();
} else {
  importData();
}

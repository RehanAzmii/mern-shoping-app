const mongoose = require("mongoose");
const color = require("colors");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`Mongodb connected ${conn.connection.host}`.bgMagenta.white);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDb;

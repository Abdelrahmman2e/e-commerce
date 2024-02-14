const fs = require("fs");
const Product = require("../../models/porductModel");
require("colors");
require("dotenv").config({ path: "../../config.env" });
const dbConnection = require("../../config/database");
const products = JSON.parse(fs.readFileSync("../dummyData/products.json"));

//db connection
dbConnection();

//insert data on db
const insertData = async () => {
  try {
    await Product.create(products);
    console.log("Data Inserted".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// node seeder.js -i
if (process.argv[2] == "-i") {
  insertData();
} else if (process.argv[2] == "-d") {
  destroyData();
}

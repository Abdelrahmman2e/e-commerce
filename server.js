const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRouter = require("./routes/Category");
const subCategoryRouter = require("./routes/subCategory");
const ApiError = require("./util/ApiErrors");
const errHandlerMW = require("./middlewares/errorHandlerMw");

const brandRouter = require("./routes/Brand");
const productRouter = require("./routes/Product");

dbConnection();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use("/api/categories", categoryRouter);
app.use("/api/subcategories", subCategoryRouter);
app.use("/api/brands", brandRouter);
app.use("/api/products", productRouter);

app.all("*", (req, res, nxt) => {
  nxt(new ApiError(`can't find this route : ${req.originalUrl}`, 400));
});

app.use(errHandlerMW);

const PORT = process.env.PORT;

let server = app.listen(PORT, () =>
  console.log(`app listening on port ${PORT}..!!`)
);

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error:${err.name} |${err.message}`);
  server.close(() => {
    console.error("Shutting Down ):");
    process.exit(1);
  });
});

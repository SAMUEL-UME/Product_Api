require("dotenv").config();
require("express-async-errors")
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

//async errors

const express = require("express");
const app = express();

const notfoundMiddlewar = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.json());

//rootes
app.get("/", (req, res) => {
  res.send(`<h1>My store api</h1><a href="/api/v1/products">product route</a>`);
});

app.use("/api/v1/products", productsRouter);

//product routes

app.use(notfoundMiddlewar);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log("Server is listening on port 3000..."));
  } catch (error) {
    console.log(error);
  }
};

start();

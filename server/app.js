require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AuthRouter = require("./routers/auth.router");
const ProductRouter = require("./routers/product.router");
require("./config/database.config");

const port = process.env.PORT || 3030;

const app = express();

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

app.listen(port, () => {
  console.log(`Development server started at http://localhost:${port}/`);
  console.log(`Requesting to connect with database...`);
});

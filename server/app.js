require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const AuthRouter = require("./routers/auth.router");

const port = process.env.PORT || 3030;

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use("/auth", AuthRouter);

app.listen(port, () => {
  console.log(`Development server started at http://localhost:${port}/`);
});

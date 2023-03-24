require("dotenv").config();
require("./app/db/conn");
const cors = require("cors");

const express = require("express");
const app = express();
const server = require('http').Server(app);

const urlRoute = require("./app/routes/url");

app.use(cors());
app.use(express.json());
app.use("/url", urlRoute);

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

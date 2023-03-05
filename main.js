require("dotenv").config();
require("./app/db/conn");
const cors = require("cors");

const express = require("express");
const app = express();

const playersRoute = require("./app/routes/players");
const matchesRoute = require("./app/routes/matches");

app.use(cors());
app.use(express.json());
app.use("/players", playersRoute);
app.use("/matches", matchesRoute);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const ScreeningRoute = require("./routes/OnBoardRoute");
const cashQuesterRoute = require("../Server/routes/cashQuesterRoute");

const app = express();

//env variables
require('dotenv').config();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));

//ROUTES
app.get("/", (req, res) => {
  res.send("Hello from PettyWallet Server!");
});

app.use("/", ScreeningRoute);
app.use("/cashQuester", cashQuesterRoute);


//DB CONFIG
mongoose
  .connect("mongodb://localhost:27017/PettyWallet")
  .then(() => {
    console.log("Database Connection Establised");
    app.listen(process.env.PORT || 3002, () => {
      console.log(`Server listening at port ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log("DB Connection Failed!!!");
  });




const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const graduatesRoute = require("./routes/graduates.route");
const cors = require("cors");
const app = express();
app.use(cors());
const uri = process.env.CONNECTION_STRING;
const companyRoute = require("./routes/company.route");

app.use(express.json());
app.use("/graduates", graduatesRoute);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/companies", companyRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the company API!");
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to the database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
  });

const { getAllTransactions, getStatistics } = require("../controllers/transactionController.js");
const { ProductModel } = require("../models/schema");
const express = require("express");
const transactionRouter = express.Router();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
transactionRouter.get("/api/transactions", getAllTransactions);
//stats

transactionRouter.get("/api/statistics",getStatistics );



module.exports = { transactionRouter };

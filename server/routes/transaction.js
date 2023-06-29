const { getAllTransactions, getStatistics, priceRange } = require("../controllers/transactionController.js");
const express = require("express");
const transactionRouter = express.Router();

transactionRouter.get("/api/transactions", getAllTransactions);
//stats
transactionRouter.get("/api/statistics",getStatistics );
//barchartAp for pricerange
transactionRouter.get("/api/pricerange", priceRange);


module.exports = { transactionRouter };

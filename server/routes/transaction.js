const {ProductModel} = require("../models/schema");
const express = require("express");
const transactionRouter = express.Router();

transactionRouter.get("/api/transactions", async(req,res)=>{
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

     ProductModel.paginate({},{page,limit})
    .then((response)=>{
        res.json(response);
    })
    .catch((error) =>{
        res.json({message : error});
    })
})
//stats
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
transactionRouter.get("/api/stats", async (req, res) => {
  try {
    const { month = "January" } = req.query;

    const transactions = await ProductModel.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, months.indexOf(month) + 1],
      },
    });

    const stats = {
      totalSaleAmount: 0,
      totalSoldItems: 0,
      totalUnsoldItems: 0,
    };

    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].sold) {
        stats.totalSaleAmount += transactions[i].price;
        stats.totalSoldItems++;
      } else {
        stats.totalUnsoldItems++;
      }
    }

    res.status(200).send(stats);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = {transactionRouter};
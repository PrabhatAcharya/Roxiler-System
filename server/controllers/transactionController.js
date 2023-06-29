const { ProductModel } = require("../models/schema");
const mongoose=require("mongoose");
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
 const getAllTransactions = async (req, res) => {
  try {
    let search = req.query.search;
    let month = req.query.month || "";
    let page = Number(req.query.page) || 1;
    let perPage = Number(req.query.perPage) || 10;
    let filteredData = {};

    if (search) {
      filteredData = {
        $text: { $search: search },
        $expr: {},
      };
    } else {
      if (month === "") {
        filteredData = {};
      } else {
        filteredData = {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, months.indexOf(month) + 1],
          },
        };
      }
    }
    let result = await ProductModel.find(filteredData)
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const getStatistics = async (req, res) => {
  try {
    const { month = "January" } = req.query;

    const transactions = await ProductModel.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, months.indexOf(month) + 1],
      },
    });

    const statistics = {
      totalSaleAmount: 0,
      totalSoldItems: 0,
      totalUnsoldItems: 0,
    };

    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].sold) {
        statistics.totalSaleAmount += transactions[i].price;
        statistics.totalSoldItems++;
      } else {
        statistics.totalUnsoldItems++;
      }
    }

    res.status(200).send(statistics);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
module.exports = { getAllTransactions, getStatistics };

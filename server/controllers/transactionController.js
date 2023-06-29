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
const priceRange = async (req, res) => {
  try {
    const { month = "January" } = req.query;

    const transactions = await ProductModel.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, months.indexOf(month) + 1],
      },
    });

    const sales = [];
    for (let i = 100; i <= 1000; i += 100) {
      sales.push({
        range: {
          from: i === 100 ? 0 : i - 100 + 1,
          to: i === 1000 ? "above" : i,
        },
        count: 0,
      });
    }

    for (let transaction of transactions) {
      if (transaction.price <= 100) {
        sales[0].count++;
      } else if (transaction.price >= 901) {
        sales[9].count++;
      } else if (transaction.price % 100 === 0) {
        sales[transaction.price / 100 - 1].count++;
      } else {
        sales[Math.floor(transaction.price / 100)].count++;
      }
    }

    res.status(200).send(sales);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
module.exports = { getAllTransactions, getStatistics, priceRange };

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

module.exports = {transactionRouter};
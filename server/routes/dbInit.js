const {ProductModel} = require("../models/schema");
const axios = require("axios")
const express = require("express");
const Router = express.Router();

Router.get("/api/dbInit", async(req, res) => {
    try{
        const response = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
        const jsonData = response.data;
        await ProductModel.insertMany(jsonData);

        res.status(200).json({
            message : "Database initialization successful"
        });

    }catch(error){
        console.error("Database initialization error : ", error);
        res.status(500).json({error: "Database initialization failed" });

    }
});

module.exports = {Router};
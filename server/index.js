const express = require("express");
const connectDb = require("./config/config");
const cors = require("cors");

const {Router} = require("./routes/dbInit");
const {transactionRouter} = require("./routes/transaction")
const app =  express();
app.use(express.json());
app.use(cors());

app.use("/",Router);
app.use("/",transactionRouter);

connectDb()
.then(()=>{
    app.listen(8080,()=>{
        console.log("Server is listening on port 8080");
    })
})


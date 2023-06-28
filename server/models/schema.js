const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
    title : String,
    price : Number,
    description : String,
    category : String,
    image : String,
    sold : Boolean,
    dateOfSale : Date,
   
});
productSchema.plugin(mongoosePaginate);
const ProductModel = mongoose.model("Product", productSchema);

module.exports = {
    ProductModel
}
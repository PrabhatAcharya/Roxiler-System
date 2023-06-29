const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: Date,
});
productSchema.index({
  title: "text",
  price: "text",
  description: "text",
});
productSchema.plugin(mongoosePaginate);
const ProductModel = mongoose.model("Product", productSchema);

module.exports = {
    ProductModel
}
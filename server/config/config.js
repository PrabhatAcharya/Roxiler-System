const mongoose = require("mongoose");

async function connectDb() {
  const result = await mongoose.connect(
    "mongodb+srv://prabhat:SCRAM@cluster0.x3ietqf.mongodb.net/?retryWrites=true&w=majority"
  );
  return result;
}
module.exports = connectDb;

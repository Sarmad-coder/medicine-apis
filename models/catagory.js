let mongoose = require("mongoose");

let categorySchema = mongoose.Schema({
  
  categoryName: String,
},{
  timestamps: true
})
let Catagory = mongoose.model("catagory", categorySchema)
module.exports = Catagory;

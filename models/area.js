// ticket.js
let mongoose = require("mongoose");

let AmountTypeSchema = mongoose.Schema({
  
  name: String,
},{
  timestamps: true
});

let AmountType = mongoose.model("Area", AmountTypeSchema);
module.exports = AmountType;


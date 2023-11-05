// ticket.js
let mongoose = require("mongoose");

let AmountTypeSchema = mongoose.Schema({
  
  type: String,
},{
  timestamps: true
});

let AmountType = mongoose.model("AmountType", AmountTypeSchema);
module.exports = AmountType;


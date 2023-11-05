// ticket.js
let mongoose = require("mongoose");

let ExpenseSchema = mongoose.Schema({
  
  amount: String,
  description: String,
  userCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default:null
},
  supplierCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    default:null
},
  type: String,
},{
  timestamps: true
});

let Expense = mongoose.model("Expense", ExpenseSchema);
module.exports = Expense;


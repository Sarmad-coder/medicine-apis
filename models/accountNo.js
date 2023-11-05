let mongoose = require("mongoose");

let accountNoSchema = mongoose.Schema({
  
  accountNo: String,
},{
  timestamps: true
})
let AccountNo = mongoose.model("AccountNo", accountNoSchema)
module.exports = AccountNo;

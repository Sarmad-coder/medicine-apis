let mongoose = require("mongoose");

let companySchema = mongoose.Schema({
  
  companyName: String,
  number: String,
  address: String,
  accountNo:{
    type: String, // Change the type to String to store it as a string
    unique: true,
    required: true,
    default: '01',
  },
},{
  timestamps: true
})
let Company = mongoose.model("company", companySchema)
module.exports = Company;

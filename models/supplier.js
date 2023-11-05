let mogoose = require("mongoose")

let SupplierSchema = mogoose.Schema({
  
  accountType: String,
  address: String,
  supplierName: String,
  fax: String,
  openingBalCr: String,
  openingBalDr: String,
  phone1: String,

  phone2: String,
  trailBalance: Boolean,
  accountNo: String
  
},{
  timestamps: true
})
let Supplier = mogoose.model("Supplier", SupplierSchema)
module.exports = Supplier;

let mogoose = require("mongoose")

let subCategorySchema = mogoose.Schema({

  accountType: String,
  address: String,
  area: String,
  city: String,
  customerName: String,
  fax: String,
  openingBalCr: String,
  openingBalDr: String,
  phone1: String,

  phone2: String,
  trailBalance: Boolean,
  accountNo: String,
  balance:String,
  type: String,
})
let User = mogoose.model("User", subCategorySchema)
module.exports = User;

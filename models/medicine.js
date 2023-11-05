let mogoose = require("mongoose")

let MedicineSchema = mogoose.Schema({
  companyName:String,
  categoryId:{type: mogoose.Schema.Types.ObjectId, ref: "catagory"},
  itemName: String,
  purchasePrice:String,
  salePrice:String,
  qty:String,
  reOrder:String,
type:String,
  
},{
  timestamps: true
})
let Medicine = mogoose.model("medicine",MedicineSchema)
module.exports = Medicine;

let mogoose = require("mongoose")

let MedicinePurchaseSchema = mogoose.Schema({
  
  supplierId:{
    type: mogoose.Schema.Types.ObjectId,
    ref: "Supplier"
},
  medicineId:{
    type: mogoose.Schema.Types.ObjectId,
    ref: "medicine"
},
  quantity:String,
  purchasePrice:{ type: String, default: '' },
  salePrice:{ type: String, default: '' },
  
  
},{
  timestamps: true
})
let MedicinePurchase = mogoose.model("medicinePurchase", MedicinePurchaseSchema)
module.exports = MedicinePurchase;
let mongoose = require("mongoose")

let saleViaSchema = mongoose.Schema({
  product:[{ 
    medicineId:{ type: mongoose.Schema.Types.ObjectId, ref: "medicine" },
    quantity: {type:String},
  
}],

   supplierId:{ type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  status: {type:Boolean,default:true},
  totalBill:{type:String},
  todayDate:{type:String},
  method:{type:String},
  createdAt:{ type: Date, default: Date.now() },
});

let SaleVia = mongoose.model("saleVia", saleViaSchema)
module.exports = SaleVia;
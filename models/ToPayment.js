let mongoose = require("mongoose");

let ToPaymentSchema = mongoose.Schema({
  
  customerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},
  amount: String,
  paymentType:String,
  discription:String,
},{
  timestamps: true
})
let ToPayment = mongoose.model("ToPayment", ToPaymentSchema)
module.exports = ToPayment;

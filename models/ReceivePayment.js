let mongoose = require("mongoose");

let ReceivePaymentSchema = mongoose.Schema({
  
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
let ReceivePayment = mongoose.model("ReceivePayment", ReceivePaymentSchema)
module.exports = ReceivePayment;

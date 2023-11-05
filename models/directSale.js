let mongoose = require("mongoose")

let directSaleSchema = mongoose.Schema({
  product: [{
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "medicine" },
    quantity: { type: String },
    profit: { type: String }

  }],

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: Boolean, default: true },
  totalBill: { type: String },
  todayDate: { type: String },
  profit: { type: String },
  method: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

let RiderStock = mongoose.model("directSale", directSaleSchema)
module.exports = RiderStock;
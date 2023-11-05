var express = require("express");
var router = express.Router();
let Supplier = require("../models/supplier");
let AccountNo= require("../models/accountNo")
router.post("/create", async (req, res) => {
  const lastAccountNo = await AccountNo.findOne({}, {}, { sort: { accountNo: -1 } });
    let newAccountNumber = '0001'; // Initial value
    if (lastAccountNo) {
      
      newAccountNumber = (parseInt(lastAccountNo.accountNo, 10) + 1).toString().padStart(4, '0');
      
    }
    req.body.accountNo = newAccountNumber;
    lastAccountNo.accountNo = newAccountNumber;
  let supplier = new Supplier(req.body);
  await supplier.save();
  await AccountNo.findByIdAndUpdate(lastAccountNo._id, lastAccountNo)
  res.json(supplier);
});
router.get("/getAll", async (req, res) => {
  let supplier = await Supplier.find();
  res.json(supplier);
});
router.get("/getById", async (req, res) => {
  console.log(req.query.id);
  let supplier = await Supplier.findById(req.query.id);
  res.json(supplier);
});
router.delete("/deleteById/:id", async (req, res) => {
  console.log(req.params.id);
  let supplier = await Supplier.findByIdAndDelete(req.params.id);

  res.json(supplier);
});

router.put("/updateById", async (req, res) => {
  console.log(req.body);
  Supplier.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
});

module.exports = router;

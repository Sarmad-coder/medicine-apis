var express = require("express");
var router = express.Router();
let ReceivePayment = require("../models/ReceivePayment");

router.post("/create", async (req, res) => {
  let receivePayment = new ReceivePayment(req.body);
  await receivePayment.save();
  res.json(receivePayment);
});
router.get("/getAll", async (req, res) => {
  let receivePayment = await ReceivePayment.find();
  res.json(receivePayment);
});
router.get("/getById", async (req, res) => {
  console.log(req.query.id);
  let receivePayment = await ReceivePayment.findById(req.query.id);
  res.json(receivePayment);
});
router.delete("/deleteById/:id", async (req, res) => {
  
  console.log(req.params.id);
  let receive = await ReceivePayment.findByIdAndDelete(req.params.id);

  res.json(receive);
});

router.put("/updateById", async (req, res) => {
  if (req.files) {
    if (req.files.subCategoryImage) {
      req.body.subCategoryImage = req.files.subCategoryImage[0].originalname;
    }
  }
  console.log(req.files);
  console.log(req.body);
  ReceivePayment.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
});

module.exports = router;

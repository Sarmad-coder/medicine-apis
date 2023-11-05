var express = require('express');
var router = express.Router();

let AmountType = require("../models/amountType")


router.post("/create", async (req, res) => {
  
  let amountType = new AmountType(req.body)
  await amountType.save()
  res.json(amountType)
})
router.get("/getAll", async (req, res) => {
  let user = await AmountType.find()
  res.json(user)
})
router.delete("/deleteById/:id", async (req, res) => {
  console.log(req.params.id)
  let amountType = await AmountType.findByIdAndDelete(req.params.id)
  // await SubCategory.deleteMany({ categoryID: req.params.id })
  res.json(amountType)
})
router.get("/getById/:id", async (req, res) => {
  console.log(req.params.id)
  let amountType = await AmountType.findById(req.query.id)
  res.json(amountType)
})
router.put("/updateById", async (req, res) => {
  
  AmountType.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
})


module.exports = router;

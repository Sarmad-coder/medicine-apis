var express = require('express');
var router = express.Router();
let Area = require("../models/area")
let AmountType = require("../models/amountType")


router.post("/create", async (req, res) => {
  
  let area = new Area(req.body)
  await area.save()
  res.json(area)
})
router.get("/getAll", async (req, res) => {
  let user = await Area.find()
  res.json(user)
})
router.delete("/deleteById/:id", async (req, res) => {
  console.log(req.params.id)
  let area = await Area.findByIdAndDelete(req.params.id)
  // await SubCategory.deleteMany({ categoryID: req.params.id })
  res.json(area)
})
router.get("/getById/:id", async (req, res) => {
  console.log(req.params.id)
  let area = await Area.findById(req.query.id)
  res.json(area)
})
router.put("/updateById", async (req, res) => {
  
  Area.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
})


module.exports = router;

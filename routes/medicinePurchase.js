var express = require('express');
var router = express.Router();

let MedicinePurchase = require("../models/medicinePurchase")



router.post("/create", async (req, res) => {
  try {
    
   
    let medicine = new MedicinePurchase(req.body)
    await medicine.save()

    res.json(medicine)
  } catch (err) {
    console.log(err)
  }
})
router.get("/getAll", async (req, res) => {
  let medicine = await MedicinePurchase.find()
  console.log("medicine getAll")
  res.json(medicine)
})
router.get("/getById/:id", async (req, res) => {
  console.log(req.query.id)
  try {
    let medicine = await MedicinePurchase.findById(req.params.id)
    if (medicine) {

      res.json(medicine)
    } else {
      res.json({ status: false, data: {} })
    }
  } catch (error) {
    console.log(error)
    res.json({ status: false })
  }

})
router.delete("/delteById/:id", async (req, res) => {
  console.log(req.params.id)

  let medicine = await MedicinePurchase.findByIdAndDelete(req.params.id)
  
  res.json(medicine)
})
router.put("/updateById", async (req, res) => {

  console.log(req.body)
  MedicinePurchase.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
})

module.exports = router;

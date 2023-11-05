var express = require('express');
var router = express.Router();
let ToPayment = require("../models/ToPayment");


router.post("/create", async (req, res) => {
    let toPayment = new ToPayment(req.body)
   await toPayment.save()
    res.json(toPayment)
})
router.get("/getAll", async (req, res) => {
  let toPayment = await ToPayment.find()
  res.json(toPayment)
})
router.get("/getById",async (req,res)=>{
  console.log(req.query.id)
  let toPayment=await ToPayment.findById(req.query.id)
  res.json(toPayment)
})
router.delete("/deleteById/:id", async (req, res) => {
  
  console.log(req.params.id);
  let toPayment = await ToPayment.findByIdAndDelete(req.params.id);

  res.json(toPayment);
});

router.put("/updateById",async (req,res)=>{
 
  
  console.log(req.body)
  console.log(req.body.id);
 await  ToPayment.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
})

module.exports = router;

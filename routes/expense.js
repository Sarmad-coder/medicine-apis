var express = require("express");
var router = express.Router();
let Expense = require("../models/expense");
let User = require("../models/user");
let Supplier = require("../models/supplier");

router.post("/create", async (req, res) => {
  let expense = new Expense(req.body);
  await expense.save();
  res.json(expense);
});
router.get("/getAll", async (req, res) => {
  try {
   
    const expenses = await Expense.find().populate("userCode").populate("supplierCode");
  
    
  
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching expenses.' });
  }
  
})  
router.get("/getById", async (req, res) => {
  console.log(req.query.id);
  let expense = await Expense.findById(req.query.id);
  res.json(expense);
});
router.delete("/deleteById/:id", async (req, res) => {
  console.log(req.params.id);
  let expense = await Expense.findByIdAndDelete(req.params.id);

  res.json(expense);
});

router.put("/updateById", async (req, res) => {
  Expense.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
});

module.exports = router;

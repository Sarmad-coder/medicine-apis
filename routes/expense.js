var express = require("express");
var router = express.Router();
let Expense = require("../models/expense");
let User = require("../models/user");
let Supplier = require("../models/supplier");
let { ObjectId } = require("mongodb")

router.post("/create", async (req, res) => {
  let expense = new Expense(req.body);
  await expense.save();
  res.json(expense);
});
router.get("/getAll", async (req, res) => {
  try {

    const expenses = await Expense.find().populate("userCode");

    console.log(expenses);

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching expenses.' });
  }

})
router.get("/getAllTrailExpense", async (req, res) => {
  try {

    const expenses = await Expense.find().populate("userCode");
    let trailExpense = expenses.filter((item) => {
      return item.userCode.trailBalance == true
    })


    res.json(trailExpense);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching expenses.' });
  }

})

router.get("/getExpenseByUserCode", async (req, res) => {
  try {

    const expenses = await Expense.find({ userCode: req.query.id }).populate("userCode");
    


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


router.get("/getLastBalance", async (req, res) => {
  try {
    const userId = new ObjectId(req.query.id)

    // Use aggregation to calculate total balance
    const result = await Expense.aggregate([
      {
        $match: {
          userCode: userId
        }
      },
      {
        $group: {
          _id: null,
          totalDebit: {
            $sum: {
              $cond: {
                if: { $eq: ["$type", "Debit"] },
                then: { $toDouble: "$amount" },
                else: 0
              }
            }
          },
          totalCredit: {
            $sum: {
              $cond: {
                if: { $eq: ["$type", "Credit"] },
                then: { $toDouble: "$amount" },
                else: 0
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalBalance: { $subtract: ["$totalDebit", "$totalCredit"] }
        }
      }
    ]);

    console.log(result);

    // Return the result as JSON
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
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

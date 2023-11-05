var express = require("express");
var router = express.Router();

let Medicine = require("../models/medicine");

router.post("/create", async (req, res) => {
  try {
    let medicine = new Medicine(req.body);
    await medicine.save();

    res.json(medicine);
  } catch (err) {
    console.log(err);
  }
});
router.get("/getAll", async (req, res) => {
  let medicine = await Medicine.find().populate("categoryId");
  console.log("medicine getAll", medicine);
  res.json(medicine);
});
router.get("/getById/:id", async (req, res) => {
  console.log(req.query.id);
  try {
    let medicine = await Medicine.findById(req.params.id);
    if (medicine) {
      res.json(medicine);
    } else {
      res.json({ status: false, data: {} });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: false });
  }
});
router.delete("/deleteById/:id", async (req, res) => {
  console.log(req.params.id);

  let medicine = await Medicine.findByIdAndDelete(req.params.id);

  res.json(medicine);
});
// router.get("/getByNo", async (req, res) => {
//   console.log(req.query.phoneNo)
//   let medicine = await Medicine.find(req.query)
//   if (medicine[0]) {

//     res.json(medicine)
//   } else {
//     res.json(false)
//   }
// })
router.put("/updateById", async (req, res) => {
  console.log(req.body);
  Medicine.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
});

module.exports = router;

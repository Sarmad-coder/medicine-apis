var express = require("express");
var router = express.Router();

let DirectSale = require("../models/directSale");
let medicine = require("../models/medicine");

router.post("/create", async (req, res) => {
  try {



    const medicineIds = req.body.product.map(async (item) => {

      const medicineData = await medicine.findOne({ _id: item?.medicineId });


      console.log(item?.quantity);
      console.log(medicineData?.qty);

      if (parseInt(medicineData?.qty) <= parseInt(item?.quantity)) {
        res.status(500).json({
          status: 'error',
          message: `${medicineData?.companyName} Medicine out off stock`
        });
      }
      else {

        let rirectSale = new DirectSale(req.body);
        await rirectSale.save();

        medicineData.qty -= item?.quantity;
        await medicineData.save();

        res.json({
          status: 'ok',
          data: rirectSale
        });


      }

    }

    );





  } catch (error) {

    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/getAll", async (req, res) => {
  let rirectSale = await DirectSale.find().populate("userId")
  console.log("medicine getAll", rirectSale);
  res.json(rirectSale);
});


router.get("/profit", async (req, res) => {
  let rirectSale = await DirectSale.find({ profit: { $exists: true } })
  console.log("medicine getAll", rirectSale);
  res.json(rirectSale);
});




router.get("/todayReports", async (req, res) => {
  try {
    // Get the current date and set time to the start of the day (00:00:00)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // Get the current date and set time to the end of the day (23:59:59)
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Find all DirectSales within the current day
    const directSale = await DirectSale.find({
      createdAt: { $gte: todayStart, $lte: todayEnd }
    }).populate("userId").populate("product");

    console.log("Reports for today:", directSale);

    res.json(directSale);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





router.get("/getById/:id", async (req, res) => {
  console.log(req.query.id);
  try {
    let rirectSale = await DirectSale.findById(req.params.id);
    if (rirectSale) {
      res.json(rirectSale);
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

  let rirectSale = await DirectSale.findByIdAndDelete(req.params.id);

  res.json(rirectSale);
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
  DirectSale.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
});

module.exports = router;

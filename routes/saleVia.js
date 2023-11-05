var express = require("express");
var router = express.Router();

let SaleVia = require("../models/saleVia");

router.post("/create",  async (req, res) => {
    console.log(req.body)
    
  
  
    let saleVia = new SaleVia(req.body)
    await saleVia.save()
    res.json({
      status: 'ok',
      data: saleVia
    })
  })
router.get("/todaySupplierReports", async (req, res) => {
  let saleVia = await SaleVia.find().populate("supplierId").populate("product")
  console.log("medicine getAll", saleVia);
  res.json(saleVia);
});
router.get("/getById/:id", async (req, res) => {
  console.log(req.query.id);
  try {
    let sleVia = await SaleVia.findById(req.params.id);
    if (sleVia) {
      res.json(sleVia);
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

  let saleVia = await SaleVia.findByIdAndDelete(req.params.id);

  res.json(saleVia);
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
  SaleVia.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
});

module.exports = router;

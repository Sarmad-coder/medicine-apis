var express = require("express");
var router = express.Router();
let Company = require("../models/company")


router.post("/create", async (req, res) => {
  const lastAccountNo = await Company.findOne({}, {}, { sort: { accountNo: -1 } });
    let newAccountNumber = '01'; // Initial value
    if (lastAccountNo) {
      
      newAccountNumber = (parseInt(lastAccountNo.accountNo, 10) + 1).toString().padStart(2, '0');
      
    }
    req.body.accountNo = newAccountNumber;
  let company = new Company(req.body);
  await company.save();
  res.json(company);
});
router.get("/getAll", async (req, res) => {
  let company = await Company.find();
  res.json(company);
});
router.get("/getById", async (req, res) => {
  console.log(req.query.id);
  let company = await Company.findById(req.query.id);
  res.json(company);
});
router.delete("/deleteById/:id", async (req, res) => {
  console.log(req.params.id)
  let company = await Company.findByIdAndDelete(req.params.id)
  // await SubCategory.deleteMany({ categoryID: req.params.id })
  res.json(company)
})
// router.get("/getByCategoryId",async (req,res)=>{
//   console.log(req.query.categoryID)
//   let subCatagory=await SubCatagory.find(req.query)
//   res.json(subCatagory)
// })

router.put("/updateById", async (req, res) => {
  if (req.files) {
    if (req.files.subCategoryImage) {
      req.body.subCategoryImage = req.files.subCategoryImage[0].originalname;
    }
  }
  console.log(req.files);
  console.log(req.body);
  Company.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
});


module.exports = router;

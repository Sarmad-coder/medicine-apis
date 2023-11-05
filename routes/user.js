var express = require("express");
var router = express.Router();
let User = require("../models/user");
let AccountNo= require("../models/accountNo")

router.post("/create", async (req, res) => {
  const lastAccountNo = await AccountNo.findOne({}, {}, { sort: { accountNo: -1 } });
    let newAccountNumber = '0001'; // Initial value
    if (lastAccountNo) {
      
      newAccountNumber = (parseInt(lastAccountNo.accountNo, 10) + 1).toString().padStart(4, '0');
      
    }
    req.body.accountNo = newAccountNumber;
    lastAccountNo.accountNo = newAccountNumber;
  let user = new User(req.body);
  await user.save();
  await AccountNo.findByIdAndUpdate(lastAccountNo._id, lastAccountNo)
  res.json(user);
});
router.get("/getAll", async (req, res) => {
  let user = await User.find();
  res.json(user);
});
router.get("/getById", async (req, res) => {
  console.log(req.query.id);
  let user = await User.findById(req.query.id);
  res.json(user);
});
router.delete("/deleteById/:id", async (req, res) => {
  console.log(req.params.id)
  let user = await User.findByIdAndDelete(req.params.id)
  // await SubCategory.deleteMany({ categoryID: req.params.id })
  res.json(user)
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
  User.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
});
router.post("/createACno", async (req, res) => {
  let accountNo = new AccountNo(req.body);
  await accountNo.save();
  res.json(accountNo);
});

module.exports = router;

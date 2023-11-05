var express = require('express');
var router = express.Router();
let Catagory = require("../models/catagory")
let SubCategory = require("../models/user")
let multer = require("multer")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = './public/images'

    cb(null, path)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage, limits: { fieldSize: 20971520 } })

router.post("/create", async (req, res) => {
  
  let category = new Catagory(req.body)
  await category.save()
  res.json(category)
})
router.get("/getAll", async (req, res) => {
  let user = await Catagory.find()
  res.json(user)
})
router.delete("/deleteById/:id", async (req, res) => {
  console.log(req.params.id)
  let category = await Catagory.findByIdAndDelete(req.params.id)
  // await SubCategory.deleteMany({ categoryID: req.params.id })
  res.json(category)
})
router.get("/getById/:id", async (req, res) => {
  console.log(req.params.id)
  let category = await Catagory.findById(req.query.id)
  res.json(category)
})
router.put("/updateById", async (req, res) => {
  
  Catagory.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
})


module.exports = router;

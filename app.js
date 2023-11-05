const mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var categoryRouter = require('./routes/catagory');
var medicineRouter = require('./routes/medicine');
var usersRouter = require('./routes/user');
var supplierRouter = require('./routes/supplier');
var expenseRouter = require('./routes/expense');
var receivePaymentRouter = require('./routes/receivePayment');
var toPaymentRouter = require('./routes/ToPayment');
var amountTypeRouter = require('./routes/amountType');
var areaRouter = require('./routes/area');
const medicinePurchaseRouter=require("./routes/medicinePurchase")
const directSaleRouter=require("./routes/directSale")
const saleViaRouter=require("./routes/saleVia")
const companyRouter=require("./routes/company")
const http = require("http")
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ limit: '150mb', extended: false }));
app.use(cors());


mongoose
  .connect("mongodb://127.0.0.1:27017/medicineDb")
  .then(() => console.log('Mongodb connected'))
  .catch((error) => {
    console.log('Mongodb connection failed. exiting now...');
    console.error(error);
    process.exit(1);
  });

app.use('/medicine', medicineRouter);
app.use('/category', categoryRouter);
app.use('/supplier', supplierRouter);
app.use('/receivePayment', receivePaymentRouter);
app.use('/toPayment', toPaymentRouter);
app.use('/directSale', directSaleRouter);
app.use('/saleVia', saleViaRouter);
app.use('/expense', expenseRouter);
app.use('/amountType',amountTypeRouter);
app.use('/area',areaRouter);
app.use('/company',companyRouter);
app.use('/user', usersRouter);

app.use('/medicinePurchase', medicinePurchaseRouter);


// let Admin = require("./models/admin")
// const bcrypt = require('bcrypt')
// const salt = 10

// async function createAdmin() {
//     let password = await bcrypt.hash("Admin@123", salt); // Salt is now 10
//     let username="admin"
//     let admin = new Admin({ "username":username, "password":password});
//     const result = await admin.save(); // Use Mongoose's save method
//     console.log("Admin created with id: ", result._id);
//   }

// createAdmin()

module.exports = app;

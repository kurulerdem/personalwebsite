const mongoose = require('mongoose');
var db;
var error;
var waiting = [];
const connectdb = () => {
  mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
  .then(() => {
    console.log("mongo db connection success");
  }).catch(e=>{
    console.log(e);
  });
};

module.exports = connectdb;

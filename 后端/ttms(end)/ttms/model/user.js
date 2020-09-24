
//引入mongoose模块
var mongoose = require('mongoose');


// 2.定义骨架schema
var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    identify:String
  })
  
  //3.创建模型model
  var userModel = mongoose.model("user",userSchema,"user");

module.exports = userModel;

//引入mongoose模块
var mongoose = require('mongoose');


var reticketSchema = new mongoose.Schema({
    reticket_userName:String,
    reticket_movieName:String,
    reticket_movieHall:String,
    reticket_table:String,
  })
  
  //3.创建模型model
  var reticketModel = mongoose.model("reticket",reticketSchema,"reticket");

  
module.exports = reticketModel;
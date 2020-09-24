
//引入mongoose模块
var mongoose = require('mongoose');


var tableSchema = new mongoose.Schema({
    tableNumber:String,
    tableHallName:String,
    tableState:String,
  })
  
  //3.创建模型model
  var tableModel = mongoose.model("table",tableSchema,"table");

  
module.exports = tableModel;
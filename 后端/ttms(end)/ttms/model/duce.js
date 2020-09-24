
//引入mongoose模块
var mongoose = require('mongoose');


var duceSchema = new mongoose.Schema({
    movieDuce:String,
    movieImg:String,
    movieName:String,
  })
  
  //3.创建模型model
  var duceModel = mongoose.model("duce",duceSchema,"duce");

  
module.exports = duceModel;
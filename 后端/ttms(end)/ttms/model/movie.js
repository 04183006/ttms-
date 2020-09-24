
//引入mongoose模块
var mongoose = require('mongoose');


var moviesSchema = new mongoose.Schema({
    movieHallNumber:String,
    movieHallName:String,
    movieHallTable:String,
    movieHallTableList:Array,
    movieHallStates:String
  })
  
  //3.创建模型model
  var moviesModel = mongoose.model("movie",moviesSchema,"movie");

  
module.exports = moviesModel;

//引入mongoose模块
var mongoose = require('mongoose');


var filmsSchema = new mongoose.Schema({
    movieName:String,
    movieDate:String,
    movieDuration:String,
    movieHall:String,
    movieFrom:String,
    movieClass:String,
    movieState:String,
    ticketList:Number,
    movieMoney:String
  })
  
  //3.创建模型model
  var filmsModel = mongoose.model("films",filmsSchema,"films");

  
module.exports = filmsModel;
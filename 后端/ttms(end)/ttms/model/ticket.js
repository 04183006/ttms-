
//引入mongoose模块
var mongoose = require('mongoose');


var ticketSchema = new mongoose.Schema({
    ticket_userName:String,
    ticket_movieName:String,
    ticket_movieHall:String,
    ticket_money:Number,
    ticket_date:String,
    ticket_Class:String,
    ticket_table:String,
  })
  
  //3.创建模型model
  var ticketModel = mongoose.model("ticket",ticketSchema,"ticket");

  
module.exports = ticketModel;
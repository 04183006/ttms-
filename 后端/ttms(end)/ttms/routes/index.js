var express = require('express');
var router = express.Router();
//引入mongoose模块
var mongoose = require('mongoose');
// 1.连接数据库

const db = mongoose.connect('mongodb://127.0.0.1:27017/ttms', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("连接数据库成功！");
  }
})
//1.引入user(用户)数据模型
const userModel = require('../model/user');
//2.引入movie(影厅)数据模型
const moviesModel = require('../model/movie');
//3.引入films(电影)数据模型
const filmsModel = require('../model/films');
//4.引入介绍(duce)数据模型
const duceModel = require('../model/duce');
//5.引入座位(table)数据模型
const tableModel = require('../model/table');
//6.引入票务(ticket)数据模型
const ticketModel = require('../model/ticket');

//7.引入票务(ticket)数据模型
const reticketModel = require('../model/return');



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
//登录路由
router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const identify = req.body.identify;
  console.log(username)
  console.log(password)
  // console.log(username)
  // res.send("发送数据成功")
  //查询数据库
  userModel.findOne({
      username
    })
    .then(user => {
      // console.log(user)
      // if(user.password == password){
      //   res.send({identify:user.identify})
      // }

      if (!user) {
        res.send({
          identify: "对不起，您无权操作后台管理系统！"
        })
      } else {
        if (user.password == password) {
          res.send({
            identify: user.identify,
            username: user.username
          })
        }
      }
    })
})

//系统管理用户数据
router.get('/user', (req, res) => {
  userModel.find()
    .then(data => {
      res.send(data)
      console.log(data)
    })
})

//添加系统用户
router.post('/addUser', (req, res) => {
  console.log(req.body);

  var user = new userModel();
  user.username = req.body.username;
  user.password = req.body.password;
  user.identify = req.body.id;

  user.save((err) => {
    if (err) {
      console.log(err)
    } else {
      res.send('用户新增成功');
    }
  });
})

//删除系统用户
router.post("/deleteUser", (req, res) => {
  //接收GET方式穿的ID值 
  var id = req.body.id;
  console.log(req.body)
  //通过ID查找到数据
  userModel.findById(id).exec((err, data) => {
    data.remove((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("删除成功");
        res.send("删除成功！");
      }
    })
  })

})
//修改系统用户
router.post("/updateUser", (req, res) => {
  //接收GET方式穿的ID值 
  var id = req.body.id;
  console.log(req.body);
  userModel.findById(id).exec((err, data) => {
    data.username = req.body.username;
    data.password = req.body.password;
    data.identify = req.body.id2;
    data.save((err) => {
      if (err) {
        console.log(err)
      } else {
        res.send("用户数据修改成功!");
      }
    })
  })
})

//演出厅管理数据
router.get('/movieHall', (req, res) => {
  moviesModel.find()
    .then(data => {
      // console.log(data)
      res.send(data)
    })
})

//演出厅查看影厅详情接口
router.post('/movieDetail', (req, res) => {
  console.log(req.body.movieHallName);
  tableModel.find({"tableHallName":req.body.movieHallName}).then(
    data => 
    res.send(data))
})

//影厅座位添加接口
router.post('/addTable', (req, res) => {
  console.log(req.body);

  var table = new tableModel();
  table.tableNumber = req.body.tableNumber;
  table. tableHallName = req.body.tableHallName;
  table.tableState = req.body.tableState;

  table.save((err) => {
    if (err) {
      console.log(err)
    } else {
      res.send('座位新增成功');
    }
  });
})



//管理剧目数据接口
router.get('/films', (req, res) => {
  filmsModel.find()
    .then(data => {
      // console.log(data)
      res.send(data)
    })
})

//演出厅添加剧目接口
//添加系统用户
router.post('/addMovie', (req, res) => {
  // console.log(req.body);

  var films = new filmsModel();
  films.movieName = req.body.movieName;
  films.movieDate = req.body.movieDate;
  films.movieDuration = req.body.movieDuration;
  films.movieHall = req.body.movieHall;
  films.movieClass = req.body.movieClass;
  films.movieState = req.body.movieState;
  films.movieFrom = req.body.movieFrom;
  films.movieMoney = req.body.movieMoney;
  films.state = req.body.state;

  films.save((err) => {
    if (err) {
      console.log(err)
    } else {
      res.send('剧目新增成功');
    }
  });
})


//修改剧目
router.post("/updateMovie", (req, res) => {
  //接收GET方式穿的ID值 
  var id = req.body.id;
  console.log(req.body);
  filmsModel.findById(id).exec((err, data) => {
    data.movieName = req.body.movieName;
    data.movieDate = req.body.movieDate;
    data.movieDuration = req.body.movieDuration;
    data.movieHall = req.body.movieHall;
    data.movieClass = req.body.movieClass;
    data.movieState = req.body.movieState;
    data.movieFrom = req.body.movieFrom;
    data.movieMoney = req.body.movieMoney;
    data.state = req.body.state;
    data.save((err) => {
      if (err) {
        console.log(err)
      } else {
        res.send("剧目详情修改成功!");
      }
    })
  })
})

//上映剧目
router.post("/playMovie", (req, res) => {
  //接收GET方式穿的ID值 
  var id = req.body.id;
  var movieHall = req.body.movieHall;
  // console.log(req.body);
  console.log(movieHall)

  //修改上映剧目详情
  filmsModel.findById(id).exec((err, data) => {
    data.movieName = req.body.movieName;
    data.movieDate = req.body.movieDate;
    data.movieDuration = req.body.movieDuration;
    data.movieHall = req.body.movieHall;
    data.movieClass = req.body.movieClass;
    data.movieState = req.body.movieState;
    data.movieFrom = req.body.movieFrom;
    data.movieMoney = req.body.movieMoney;
    data.state = req.body.state;
    data.save((err) => {
      if (err) {
        console.log(err)
      } else {
        res.send("用户数据修改成功!");
      }
    })
  })

  //修改演出厅状态
  moviesModel.update({'movieHallName':movieHall},{'movieHallStates':"正在营业"}).then(res => console.log(res))
})


//下架剧目
router.post("/outplayMovie", (req, res) => {
  //接收GET方式穿的ID值 
  var movieName = req.body.movieName;
  var movieHall = req.body.movieHall;
  console.log(req.body);
  
  // 修改剧目状态
  filmsModel.updateOne({'movieName':movieName},{'movieState':"已上映"}).then(
      //修改演出厅状态
  moviesModel.updateOne({'movieHallName':movieHall},{'movieHallStates':"等待营业"}).then(res.send('ok'))
    
) 
})



//删除剧目
router.post("/deleteMovie", (req, res) => {
  //接收GET方式穿的ID值 
  var id = req.body.id;
  console.log(req.body)
  //通过ID查找到数据
  filmsModel.findById(id).exec((err, data) => {
    data.remove((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("删除成功");
        res.send("删除成功！");
      }
    })
  })

})

//剧目模糊查询接口
router.post("/searchMovie", (req, res) => {
  var name = req.body.searchName;
  // console.log(name) 

  filmsModel.find({movieName:{$regex: name, $options:'i'}}) 
  .then(data => {
    // console.log(data)
    res.send(data)
  })

})


//返回介绍接口
router.get("/message",(req,res) => {
  duceModel.find()
  .then(data => {
    res.send(data)
  })
})



//购票(新增票务信息)
router.post('/ticket_select', (req, res) => {
  console.log(req.body)

  // 修改座位状态
 var str = 'select';

 tableModel.updateOne({'tableNumber':req.body.tableNumber_rel,'tableHallName':req.body.tableHallName},{'tableState':str}).then(res => {
  console.log(res)
})
   

  // db.films.update({'movieName':'战狼'},{'ticketList':})

})





//添加系统用户
router.post('/ticket_buy', (req, res) => {
  // console.log(req.body);

  var ticketnumber = req.body.ticketList - 1;
  var money = (Number(req.body.movieMoneyAll) + req.body.movieMoney).toString();

  var ticket = new ticketModel();
  ticket.ticket_userName = req.body.username;
  ticket.ticket_movieHall = req.body.movieHall;
  ticket.ticket_money = req.body.movieMoney;
  ticket.ticket_movieName = req.body.movieName;
  ticket.ticket_date = req.body.movieDate;
  ticket.ticket_Class = req.body.movieClass;
  ticket.ticket_table = req.body.tableNumber_rel;
  ticket.save((err) => {
    if (err) {
      console.log(err)
    } else {
      res.send('购票成功');
    }
  });
  
  console.log(req.body)
  // console.log(money)
 var str = 'selected';

  // filmsModel.updateOne({'movieName':req.body.movieName},{'ticketList':ticketnumber}).then(res => console.log(res))
   //修改座位状态：
   
      

    //修改座位个数：
    filmsModel.updateOne({'movieName':req.body.movieName},{'ticketList':ticketnumber}).then(
     
    //修改票房状态
    filmsModel.updateOne({'movieName':req.body.movieName},{'movieMoney':money}).then(
      tableModel.updateOne({'tableNumber':req.body.tableNumber_rel,'tableHallName':req.body.movieHall},{'tableState':str}).then(res => {
        console.log(res)
      })
    )
   )
   

  // db.films.update({'movieName':'战狼'},{'ticketList':})

})

//根据用户信息，返回用户所购的票
router.post('/userTicket',(req,res) => {
  // console.log(req.body.username);
  
  
  ticketModel.find({ticket_userName:{$regex: req.body.username, $options:'i'}}) 
  .then(data => {
    // console.log(data)
    res.send(data)
  })
})


//查询售票接口
router.get('/sellTicket',(req,res) => {
  ticketModel.find()
  .then(data => {
    res.send(data);
  })
})

////查询退票接口
router.get('/outTicket',(req,res) => {
  reticketModel.find()
  .then(data => {
    res.send(data);
  })
})



router.get('/getdata',(req,res) => {
  res.send('2123');
})


router.post('/postdata',(req,res) => {
  res.send({name:'kjh',age:19});
})



//退票接口
router.post('/returnTicket',(req,res) => {
  console.log(req.body);
  // 根据用户删除票务信息
  ticketModel.findById(req.body.id).exec((err, data) => {
    data.remove((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("删除成功");
        // res.send("删除票务成功！");
      }
    })
  })
 var str = 'ready'
 

 //退票统计
 var ticket2 = new reticketModel();
 ticket2.reticket_userName = req.body.ticket_userName;
 ticket2.reticket_movieName = req.body.ticket_movieName;
 ticket2.reticket_movieHall = req.body.ticket_movieHall;
 ticket2.reticket_table = req.body.ticket_table
 ticket2.save((err) => {
   if (err) {
     console.log(err)
   } else {
     res.send('退票统计成功');
   }
 });

     
  //修改座位状态
  tableModel.updateOne({'tableNumber':req.body.ticket_table,'tableHallName':req.body.ticket_movieHall},{'tableState':str}).then(res => {
    console.log(res)
  })
 
})








module.exports = router;

// db.ticket.insert({ticket_userName:"小康",ticket_movieHall:"春暖花开影厅",ticket_money:10,})
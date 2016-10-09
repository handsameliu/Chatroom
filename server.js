var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var User = require('./db').User;
var Room = require('./db').Room;
var app = express();

app.get('/',function(req,res){
    res.sendFile(path.resolve('app/index.html'));
});
app.use(bodyParser.json());
//把public目录作为静态文件根目录
app.use(express.static(path.resolve('public')));
//把app目录作为静态文件根目录
app.use(express.static(path.resolve('app')));
/*
* 1 获取请求体对象 客户端传递过来的格式是json
*
* */
app.post('/user/login',function(req,res){
    var email  = req.body.email;
    var user = {email};
    User.findOne({email},function(err,doc){
        if(err){
            res.send({err:1,msg:'查询出错',data:err});
        }else{
            if(doc){
                res.send({err:0,msg:'成功',data:doc});
            }else{
                user.avatar = 'http://secure.gravatar.com/avatar/email';
                //保存此用户之后得到一个保存之后的文档
                User.create(user,function(err,doc2){
                    if(err){
                        res.send({err:1,msg:'创建出错',data:err});
                    }else{
                        res.send({err:0,msg:'创建成功',data:doc2});
                    }
                });
            }
        }
    })
});

app.get('/rooms',function(req,res){
    Room.find({},function(err,doc){
        if(err){
            res.send({err:1,msg:'查询出错',data:err});
        }else{
            if(doc){
                res.send({err:0,msg:'成功',data:doc});
            }else{
                res.send({err:1,msg:'返回错误',data:doc});
            }
        }
    });
});


app.listen(9090,function(){
    console.log('连接成功');
});
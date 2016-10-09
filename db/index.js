var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.dbUrl);

//定义用户的数据结构骨架
var UserSchema = new mongoose.Schema({
    email:String,
    avatar:String
});

//定义可以操作用户User集合的模型对象
var User = mongoose.module('User',UserSchema);


//导出用户模型  其他脚本使用 require('db').User 获取到对应数据
exports.User = User;


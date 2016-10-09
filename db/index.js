var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.dbUrl);

//定义用户的数据结构骨架
var UserSchema = new mongoose.Schema({
    email:String,
    avatar:String
});
//定义可以操作用户User集合的模型对象
var User = mongoose.model('User',UserSchema);

//定义房间字段模型
var RoomSchema = new mongoose.Schema({
    name:String
});
var Room = mongoose.model('Room',RoomSchema);

//导出用户模型  其他脚本使用 require('db').User 获取到对应数据
exports.User = User;
exports.Room = Room;

//创建测试数据
//Room.create([{name:'JAVA'},{name:'NODE'},{name:'PYTHON'},{name:'PHP'}]);

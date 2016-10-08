# Chatroom
angular+websoket+soketio

#创建项目
##创建文件夹并且进入
```
mkdir Chatroom
cd Chatroom
```

## 初始化bower配置文件
手工创建 **.bowerrc** 用来指定安装目录
```
{
    "direcroty":"./public/lib"
}
```

**bower.json** 用来指定项目前端依赖库
此文件通过以下命令生成（需提前安装bower）
```
bower init
bower install angular angular-route angular-moment bootstrap --save
npm install express socket.io cookie-parser express-session mongoose --save
```
## 在.gitignone中新增以下忽略
```
lib
.idea
node_modules
```


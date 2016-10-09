angular.module('chatMod').controller('RoomCtrl',function($scope,$http,$rootScope,$routeParams,$location){
    /*
    * 1 在控制器中注入$routeParams 这是一个对象，key是路径占位符，值就是路径里占位符对应的字符串
    * 2 评出url  /rooms/真实id  调用后台接口得到room对象
    * 3 后台编写一个路由响应这个请求 app.get('/rooms/:_id')
    * 4 通过Room模型的findById方法传入id，得到room对象并返回客户端
    * 5 客户端拿到room赋给$scope.room
    *
    * */
    var _id = $routeParams.id;
    $http({
        url:`/rooms/${_id}`,
        method:'GET'
    }).success(function(result){
        console.log(result);
        if(result.err==1){
            $rootScope.errMsg = result.msg;
        }else{
            $scope.room = result.data;
        }
    });

    /*
    * 开始聊天
    * 1 在后台引入socket.io 监听客户端的连接请求
    * 2 在前台连接后台的socketio服务器
    * 3 在前台发送消息给后台，后台保存当前房间里messages数组中，并且通过所有的客户端添加此消息
    *
    * */

    var socket = io.connect(`/`);
    //本机测试使用ws://localhost:9090/ 服务器使用IP地址47.88.150.99
    //或者使用`/`, 或者window.location
    socket.on('message',function(msgObj){
        //console.log(msgObj);
        console.log('接收信息');
        $scope.room.messages.push(msgObj);
        console.log('刷新信息');
        $scope.$apply();
    });
    $scope.send = function(){
        socket.send({
            user:$rootScope.user,
            content:$scope.content
        });

    };
});
angular.module('chatMod').directive('keyDown',function(){
    return {
        link:function(scope,element,attrs){
            element.keydown(function(event){
                console.log(event.keyCode);
                if(event.keyCode==13){
                    /*
                    * 在scope作用域下调用方法
                    * */
                    console.log('发送信息');
                    scope.$eval(attrs.keyDown);
                }
            });
        }
    }
});
angular.module('chatMod').controller('RoomsCtrl',function($scope,$http,$rootScope){
    //$scope.rooms = [{name:'JAVA'},{name:'NODE'}];
    //$scope.rooms = $scope._rooms = [];
    $http({
        url:'/rooms',
        type:'GET'
    }).success(function(result){
        if(result.err==1){
            $rootScope.errMsg = result.msg;
            //$rootScope.rooms = [{name:'JAVA'},{name:'NODE'}];
        }else if(result.err==0){//如果没有出错，就把返回值赋给$scope.rooms
            //if(result.data){
                //rooms为显示数据，_rooms为过滤时使用的数据
                $scope.rooms = $scope._rooms = result.data;
            //}else{
            //    $scope.rooms = [{name:'JAVA'},{name:'NODE'}];
            //}
        }
    }).error(function(error){
        console.log(error);
    });

    /*
    * 通过事件过滤信息，（前台使用了自带的filter，但新建房间按钮效果不好）。
    * */
    $scope.filter = function(){
        var keyword = $scope.keyword;
        $scope.rooms = $scope._rooms.filter(function(item){
            return item.name.toUpperCase().indexOf(keyword.toUpperCase())!=-1;
        });
    };

    /*
    * 增加房间
    * 1 给增加房间按钮绑定点击事件ng-click,当点击的时候执行$scope上的createRoom方法
    * 2 在createRoom方法中获取到房间名（$scope.keyword）,调用增加房间的后台接口，请求方法post 请求url'/rooms/add' 数据data '{name:$scope.keyword}'
    * 3 在服务器端编写/rooms/add 路由，得到请求体对象，然后调用Room.create方法把此对象保存到数据库中，拨那个返回保存后的房间对象
    * */
    $scope.createRoom = function(){
        var name = $scope.keyword;
        $http({
            url:'/rooms',
            method:'POST',
            data:{name:name}
        }).success(function(result){
            if(result.err==1){
                $rootScope.errMsg = result.msg;
            }else{
                $scope._rooms.push(result.data);
                $scope.filter();
            }
        });
    }
});
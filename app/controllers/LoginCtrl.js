angular.module('chatMod').controller('LoginCtrl',function($scope,$http,$rootScope,$location){
    $scope.login = function(){
        $http({
            url:'/user/login',
            method:'POST',
            data:{email:$scope.email}
        }).success(function(result){
            //console.log(result);
            /*
            * 1 判断err的值 如果为0表示登录成功，则把得到的user对象赋给$rootScope 探后在首页显示用户名和头像
            * 2 如果为1表示失败，在首页里显示错误的原因
            *
            * */
            if(result.err==1){
                $rootScope.errMsg = result.msg;
            }else if(result.err==0){
                $rootScope.user = result.data;
                $location.path('/rooms');
            }
        }).error(function(err){
            console.log(err);
        });
    }
});
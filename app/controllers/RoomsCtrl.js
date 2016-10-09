angular.module('chatMod').controller('RoomsCtrl',function($scope,$http,$rootScope){
    //$scope.rooms = [{name:'JAVA'},{name:'NODE'}];
    //$scope.rooms = function(){
        $http({
            url:'/rooms',
            type:'GET'
        }).success(function(result){
            if(result.err==1){
                $rootScope.errMsg = result.msg;
                //$rootScope.rooms = [{name:'JAVA'},{name:'NODE'}];
            }else if(result.err==0){//如果没有出错，就把返回值赋给$scope.rooms
                //if(result.data){
                    $scope.rooms = result.data;
                //}else{
                //    $scope.rooms = [{name:'JAVA'},{name:'NODE'}];
                //}
            }
        }).error(function(error){
            console.log(error);
        })
    //};
});
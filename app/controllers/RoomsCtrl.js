angular.module('chatMod').controller('RoomsCtrl',function($scope,$http,$rootScope){
    //$scope.rooms = [{name:'JAVA'},{name:'NODE'}];
    $scope.rooms = function(){
        $http({
            url:'/rooms',
            type:'GET'
        }).success(function(result){
            if(result.err==1){
                $rootScope.errMsg = result.msg;
                //$rootScope.rooms = [{name:'JAVA'},{name:'NODE'}];
            }else if(result.err==0){
                if(result.data){
                    $rootScope.rooms = result.data;
                }else{
                    $scope.rooms = [{name:'JAVA'},{name:'NODE'}];
                }
            }
        }).error(function(error){
            console.log(error);
        })
    };
});
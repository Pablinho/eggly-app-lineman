angular.module("app").controller('UsersController',function($scope,$http){
    $scope.answer=$http.get('http://core.totalnetworkers.com/temp_users');
    $scope.answer.success(function(response){
        $scope.users=response._embedded.temp_users;
    }).error(function(){
        $scope.users=[];
    });
});
(function(){
    'use strict';
angular.module('app',['ngRoute']).config(function($routeProvider){
    $routeProvider
        .when("/",{
           templateUrl:"home.html",
           controller:"MainController"
        })
        .when("/test",{
            templateUrl:"test.html"  
        });
        
})
.factory('Data',function(){
    return {element:"Im data from a service"};
})
.filter('reverse',function(Data){
    return function (text){
        return text.split("").reverse().join("");
    };
})
.controller('PreFooterController',function($scope,Data){
    $scope.data=Data;
})
//interacting controller with directive
.controller('FooterController',function($scope,Data){
    $scope.data=Data;
    $scope.loadMoreTweets=function(){
        alert('loading more tweets');
    };
    $scope.deleteTweets=function(){
        alert('deleting tweets');
    };
})
.directive('enter',function(){
    return function(scope,element,attrs){
      element.bind('mouseenter',function(e){
        scope.$apply(attrs.enter);   
      });
    };
})
//interacting directive with directives
.directive('numbers',function(Data){
    return {
        restrict:'E',
        scope:{},
        controller:function($scope){
            $scope.type=[];
            this.addOdd=function(){
              $scope.type.push('odd');  
            };
            this.addEven=function(){
                $scope.type.push('even');
            };
            this.addPrime=function(){
                $scope.type.push('prime');
            };
        },
        link:function(scope,element){
            element.addClass('button');
            element.bind('mouseenter', function (e) {
                console.log(scope.type);
            });
        }
    };
})
.directive('odd',function(){
    return {
        require:'numbers',
        restrict:'A',
        link:function(scope,element,attrs,numbersCrtl){
            numbersCrtl.addOdd();
        }
    };   
})
.directive('even',function(){
    return {
        require:'numbers',
        restrict:'A',
        link:function(scope,element,attrs,numbersCrtl){
            numbersCrtl.addEven();
        }
    };   
})
.directive('prime',function(){
    return {
        require:'numbers',
        restrict:'A',
        link:function(scope,element,attrs,numbersCrtl){
            numbersCrtl.addPrime();
        }
    };   
})
//scope belongs to ng-app
.directive('cars',function(){
    return {
        restrict:'E',
        template: "<input type='text' ng-model='color'><div ng-model='color'>{{color}}</div>",
        link:function(scope,element,attrs){
            scope.color="red";
        }
    };
})
//it has its own scope
.directive('bike',function(){
    return {
        restrict:'E',
        scope:{},
        template: "<div>{{color}}</div>",
        link:function(scope,element,attrs){
            scope.color=attrs.color;
        }
    };
})
//similar as above using @ in scope (@ using for reading attributes)
.directive('moto',function(){
    return {
        restrict:'E',
        scope:{
            color:'@'
        },
        template: "<div>{{color}}</div>"
    };
})
//interacting @ scoping with a controller
.controller('SkateController',function($scope){
    $scope.color="pink";
})
.directive('skate',function(){
    return {
        restrict:'E',
        scope:{
            color:'@'
        },
        template: '<input type="text" ng-model="color">'
    };
})
//using & inside scope for communicate directive ---> controller (like an api)
.controller('ListenController',function($scope){
    $scope.ListenTo=function(author){
        alert('I am listening to :'+author);
    };
})
.directive('author',function(){
    return{
        scope:{
            play:"&"
        },
        template:'<input type="text" ng-model="author">'+
        '<button ng-click="play({author:author})">Play</button>'
    };
})
//using = inside scope fot communicate directive <----> controller (bidirectionally)
.controller('TrainController',function($scope){
    $scope.color="brown";
})
.directive('train',function(){
    return {
        restrict:'E',
        scope:{
            color:'='
        },
        template: '<input type="text" ng-model="color">'
    };
});
})();
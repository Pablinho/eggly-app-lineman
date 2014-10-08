angular.module('Eggly',[])
.controller('MainController',function($scope){
    $scope.hello="Hello world!";
    $scope.categories=[
        {"id": 0, "name": "Development"},
        {"id": 1, "name": "Design"},
        {"id": 2, "name": "Exercise"},
        {"id": 3, "name": "Humor"}
    ];
    $scope.bookmarks=[
        {"id":0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
        {"id":1, "title": "Egghead.io", "url": "http://angularjs.org", "category": "Development" },
        {"id":2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
        {"id":3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design" },
        {"id":4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise" },
        {"id":5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise" },
        {"id":6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor" },
        {"id":7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor" },
        {"id":8, "title": "Dump", "url": "http://dump.com", "category": "Humor" }
    ];
    $scope.currentCategory=null;
    
    $scope.setCurrentCategory = function (category){
        $scope.currentCategory=category;
        $scope.cancelCreating();
        $scope.cancelEditing();
    };
    $scope.isCategorySelected=function(){
        return $scope.currentCategory!==null? true:false;  
    };
    
    $scope.isCurrentCategory= function (category){
        return category !== null && $scope.currentCategory !==null ? category.name === $scope.currentCategory.name : false;
    };
    
    $scope.resetCreateForm=function (){
          $scope.newBookmark = {
              title:'',
              url:'',
              category: $scope.currentCategory
          };
    };
    
    $scope.editedBookmark=null;
    $scope.editingBookmark=null;
    
    $scope.isBookmarkSelected=function(bookmark){
        return bookmark!==null && $scope.editingBookmark !== null? bookmark.title === $scope.editingBookmark.title:false;
    };
    
    $scope.loadEditedBookmark=function(bookmark){
        $scope.editingBookmark=bookmark;
        $scope.editedBookmark=angular.copy(bookmark);
    };
    $scope.deleteBookmark=function (bookmark){
        _.remove($scope.bookmarks,function(b){
            return b.id === bookmark.id;
        });
    };
    
    $scope.updateBookmark= function (bookmark){
        var index = _.findIndex($scope.bookmarks, function (b) {
              return b.id === bookmark.id;
        });
        $scope.bookmarks[index] = bookmark;
        $scope.cancelEditing();
    };
    
    $scope.createBookmark=function (bookmark){
        bookmark.id=$scope.bookmarks.length;
        $scope.bookmarks.push(bookmark);
        $scope.resetCreateForm();
    };
    
    $scope.creating=false;
    $scope.editing=false;
    
    $scope.startCreating=function(){
        $scope.creating=true;
        $scope.editing=false;
        $scope.resetCreateForm();
    };
    $scope.cancelCreating=function (){
        $scope.creating=false; 
    };
    
    $scope.startEditing=function(){
        $scope.creating=false;
        $scope.editing=true;
    };
    
    $scope.cancelEditing=function(){
        $scope.editing=false;
        $scope.editingBookmark=null;
    };
    
    $scope.isCreating=function(){
      return $scope.creating;  
    };
    $scope.isEditing=function(){
      return $scope.editing;  
    };
    
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
})
;
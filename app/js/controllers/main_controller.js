angular.module("app").controller('MainController',function($scope){
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
    
});
angular.module('14all').directive('menu',[function(){
    return {
        restrict: 'E',
        scope:{},
        transclude:true,
        replace: true,
        template : '<ul class="nav navbar-nav" ng-transclude></ul>',
        controller:['$scope',function($scope){
            $scope.items = [];

            this.addItem = function(item){
                $scope.items.push(item);
            };

            $scope.$on("$routeChangeSuccess",function(event,current,previous){
                var currentPath = '';
                if(current.$$route){
                    currentPath = current.$$route.originalPath;
                }
                angular.forEach($scope.items,function(item,key){
                    item.active = item.strippedPath === currentPath;
                });
            });
        }]
    }
}]).directive('menuItem',[function(){
    return {
        priority: 300,
        require: "^menu",
        template:'<li ng-class="{ active: active }"><a href="{{path}}">{{displayTitle}}</a></li>',
        restrict: 'E',
        replace:true,
        scope:{
            displayTitle: '@',
            path: '@'
        },
        link : function($scope,$element,$attrs,menuController){
            menuController.addItem($scope);
            $scope.active = false;
            if($scope.path){
                $scope.strippedPath = $scope.path.substring(1);
            }
        }
    };
}]);
angular.module('14all').directive('menu',[function(){
    return {
        restrict: 'E',
        scope:{
            pageTitle:'='
        },
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

                $scope.pageTitle = 'Welcome';

                angular.forEach($scope.items,function(item,key){
                    if(item.strippedPath && item.strippedPath === currentPath){
                        item.active = true;
                        $scope.pageTitle = item.displayTitle;
                    } else{
                        item.active = false;
                    }
                });
            });
        }]
    }
}]).directive('menuItem',[function(){
    return {
        priority: 300,
        require: "^menu",
        template:'<li ng-class="{ active: active }"><a href="{{path}}" target="{{target}}">{{displayTitle}}</a></li>',
        restrict: 'E',
        replace:true,
        scope:{
            displayTitle: '@',
            path: '@',
            target:'@'
        },
        link : function($scope,$element,$attrs,menuController){
            menuController.addItem($scope);
            $scope.active = false;
            if($scope.path && $scope.path.indexOf('#') === 0){

                $scope.strippedPath = $scope.path.substring(1);
            }
        }
    };
}]);
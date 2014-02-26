angular.module('14all').directive('displayActive', ['$location',function($location) {
    return {
        template:'<li ng-class="{ active: active }"><a href="{{path}}">{{displayTitle}}</a></li>',
        restrict: 'E',
        replace:true,
        scope:{
            displayTitle: '@',
            path: '@'
        },
        link : function($scope,$element,$attr){
            $scope.active = false;
            $scope.$on("$routeChangeSuccess",function(event,current,previous){
                var currentPath = '', path = '';
                if(current.$$route){
                    currentPath = current.$$route.originalPath;
                }
                if($scope.path){
                    path = $scope.path.substring(1);
                }
                $scope.active = path === currentPath;
            });
        }
    };
}]);
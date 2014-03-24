angular.module('14all').directive('listProviders',[function(){
    return {
        restrict: 'E',
        replace: true,
        scope:{
            keyword : '=',
            infos : '=',
            initialprovider: '='
        },
        template :  '  <div class="form-group">' +
            '<label for="searchItemTitle" class="control-label">Search</label><div class="input-group"><input class="form-control" id="searchItemTitle" ng-model="keyword" type="text" />' +
            '<div class="input-group-btn"><a class="btn btn-default dropdown-toggle">{{currentProvider.title}} <span class="caret"></span></a><ul class="dropdown-menu">' +
            '<li class="" ng-repeat="provider in providers"><a ng-click="$parent.currentProvider=provider" href="">{{provider.title}}</a></li>' +
            '</ul><a class="btn btn-default" ng-click="search(keyword)">Go</a></div></div></div>',
        controller:['$scope','searchService',function($scope,searchService){
            $scope.providers = searchService.providers;
            $scope.currentProvider = {};
            $scope.search = function(keywords){
                return $scope.currentProvider.search(keywords).then(function(items){
                    $scope.infos = items;
                });
            }
        }]
    }
}]);
angular.module('providers').directive('info',['searchService',function(searchService) {
    return {
        restrict:'E',
        templateUrl:'providers/info.html',
        link: function(scope, element, attrs) {
            if(scope.info) {
                var provider = searchService.getProvider(scope.info.provider)
                scope.detailTemplate = provider.detailUrl;
            }
        },
        scope:{
            info:'='
        }
    };
}]);
angular.module('14all')
    .config(['$httpProvider',function($httpProvider){
        $httpProvider.interceptors.push('loadingHttpInterceptor');
    }])
.factory('loadingHttpInterceptor', ['$q', '$rootScope', '$injector',
    function ($q, $rootScope, $injector) {
        $rootScope.loading = false;
        $rootScope.http = null;
        return {
            'request': function (config) {
                $rootScope.loading = true;
                return config || $q.when(config);
            },
            'requestError': function (rejection) {
                $rootScope.http = $rootScope.http || $injector.get('$http');
                if ($rootScope.http.pendingRequests.length < 1) {
                    $rootScope.loading = false;
                }
                return $q.reject(rejection);
            },
            'response': function (response) {
                $rootScope.http = $rootScope.http || $injector.get('$http');
                if ($rootScope.http.pendingRequests.length < 1) {
                    $rootScope.loading = false;
                }
                return response || $q.when(response);
            },
            'responseError': function (rejection) {
                $rootScope.http = $rootScope.http || $injector.get('$http');
                if ($rootScope.http.pendingRequests.length < 1) {
                    $rootScope.loading = false;
                }
                return $q.reject(rejection);
            }
        }
    }
])
    .directive('loading',['$rootScope', function($rootScope) {
    return {
        restrict: 'E',
        template:'<div class="" ng-show="loading">' +
            '<div id="floatingCirclesG" class="absolute-center"><div class="f_circleG" id="frotateG_01"></div><div class="f_circleG" id="frotateG_02"></div><div class="f_circleG" id="frotateG_03"></div>' +
            '<div class="f_circleG" id="frotateG_04"></div><div class="f_circleG" id="frotateG_05"></div><div class="f_circleG" id="frotateG_06"></div>' +
            '<div class="f_circleG" id="frotateG_07"></div><div class="f_circleG" id="frotateG_08"></div></div></div></div>',
        scope: true,
        link: function(scope, element, attrs) {
            $rootScope.$watch('loading',function(newValue,oldValue){
                if(scope.loading === newValue)
                    return;
                else{
                    scope.loading = newValue;
                }
            });
        }
    };
}]);
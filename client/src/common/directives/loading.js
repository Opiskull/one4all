angular.module('one4all')
    .config(['$httpProvider', function ($httpProvider) {
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
    .directive('loading', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'E',
            template:
                '<div ng-show="loading" class="loading-backdrop"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>',
            scope: true,
            link: function (scope, element, attrs) {
            }
        };
    }]);
angular.module('one4all', ['ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'ngRoute',
    'ngTagsInput',
    'ngStorage',
    'auth',
    'core',
    /* Modules */
    'data.manga', 'data.movie', 'data.serie', 'data.anime', 'data.game', 'data.book', 'data.all',
    'providers',
    'dialog',
    'one4all.templates',
    'angular-growl'])
    .config(['$compileProvider', 'growlProvider', 'tagsInputConfigProvider', function ($compileProvider, growlProvider, tagsInputConfigProvider) {
        $compileProvider.debugInfoEnabled(true);
        growlProvider.globalPosition('bottom-right');
        growlProvider.globalDisableIcons(true);
        growlProvider.globalDisableCountDown(true);
        growlProvider.globalTimeToLive({success: 2000, error: -1, warning: 3000, info: 4000});
    }])
    .controller('AppCtrl', ['itemCacheService', 'paginationCacheService', 'resourceApiService', '$rootScope', function (itemCacheService, paginationCacheService, resourceApiService, $rootScope) {
        resourceApiService.getAllRequest('all').success(function (response) {
            angular.forEach(response, function (moduleItems, moduleKey) {
                itemCacheService.setItems(moduleKey, moduleItems);
                var pagination = paginationCacheService.get(moduleKey);
                pagination.totalItems = moduleItems;
            });
            $rootScope.$emit('filter');
        });
    }]);



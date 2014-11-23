angular.module('one4all', ['ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'ngRoute',
    'ngTagsInput',
    'ngStorage',
    'auth',
    'core',
    /* Modules */
    'data.manga', 'data.movie', 'data.serie', 'data.anime', 'data.game', 'data.book',
    'providers',
    'dialog',
    'one4all.templates',
    //'pasvaz.bindonce',
    'angular-growl'])
    .config(['$compileProvider', 'growlProvider', 'tagsInputConfigProvider', function ($compileProvider, growlProvider, tagsInputConfigProvider) {
        $compileProvider.debugInfoEnabled(true);
        growlProvider.globalPosition('bottom-right');
        growlProvider.globalDisableIcons(true);
        growlProvider.globalDisableCountDown(true);
        growlProvider.globalTimeToLive({success: 2000, error: -1, warning: 3000, info: 4000});
    }])
    .controller('AppCtrl', ['itemCacheService', 'resourceApiService', '$rootScope', function (itemCacheService, resourceApiService, $rootScope) {
        resourceApiService.getAllRequest('all').success(function (response) {
            angular.forEach(response, function (moduleItems, moduleKey) {
                itemCacheService.setItems(moduleKey, moduleItems);
            });
            $rootScope.$emit('filter');
        });
    }]);



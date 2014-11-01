angular.module('one4all', ['ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'ngRoute',
    'ngTagsInput',
    'ngStorage',
    'auth',
    'core',
    /* Modules */
    'manga', 'movie', 'serie', 'anime', 'game', 'book',
    'providers',
    'dialog',
    'one4all.templates',
    'pasvaz.bindonce',
    'angular-growl'])
    .config(['RestangularProvider','$compileProvider','growlProvider','tagsInputConfigProvider', function (RestangularProvider,$compileProvider,growlProvider, tagsInputConfigProvider) {
        $compileProvider.debugInfoEnabled(true);
        RestangularProvider.setBaseUrl('/api');
        growlProvider.globalPosition('bottom-right');
        growlProvider.globalDisableIcons(true);
        growlProvider.globalDisableCountDown(true);
        growlProvider.globalTimeToLive({success: 2000, error: -1, warning: 3000, info: 4000});
    }])
    .controller('AppCtrl', ['$scope', 'authService', 'settingsService', function ($scope, authService, settingsService) {
    }]);



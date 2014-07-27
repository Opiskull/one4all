angular.module('14all').factory('settingsService',['$rootScope','$store',function($rootScope,$store){
    var defaultStats = {
        finished: false,
        dropped: false,
        paused: false
    };
    var defaultOrderBy ={
        predicate: 'title',
        reverse: false
    };
    var defaultSettings = {
        filters: {
            stats: defaultStats,
            keyword: ''
        },
        orderBy: defaultOrderBy
    };
    // FIX SETTINGS
    $store.remove('settings');
    var storedSettings = {};
    var settings = angular.extend(defaultSettings,storedSettings);
    return { settings: settings };
}]);

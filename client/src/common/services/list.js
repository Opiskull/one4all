angular.module('14all').factory('listService',['settingsService','itemService', function(settingsService,itemService){

    function register(scope){

    }

    var service = {
        register: register
    };

    return service;
}]);
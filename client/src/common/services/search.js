angular.module('14all')
    .factory('searchService',['Restangular','malAnime','malManga',function(restangular,malAnime,malManga){
        var providers = [
            malAnime,
            malManga
        ];
        var service = {
            providers:providers,
            getProvider:function(title){
                var provider = {};
                angular.forEach(service.providers,function(item){
                    if(item.title && item.title === title){
                        provider = item;
                    }
                });
                return provider;
            }
        };
        return service;
    }]);
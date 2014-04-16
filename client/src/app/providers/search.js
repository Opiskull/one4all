angular.module('14all.providers')
    .factory('searchService',['Restangular','malAnime','malManga',function(restangular,malAnime,malManga){
        var providers = [
            malAnime,
            malManga
        ];
        var service = {
            getProvider:function(title){
                var provider = {};
                angular.forEach(providers,function(item){
                    if(item.title && item.title === title){
                        provider = item;
                    }
                });
                return provider;
            },
            getProvidersWithCategory:function(category){

            },
            getProviders:function(){
                return providers;
            }
        };
        return service;
    }]);
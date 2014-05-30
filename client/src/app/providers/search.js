angular.module('providers')
    .factory('searchService',['Restangular','malAnime','malManga','tmdbMovie','tmdbSerie',function(restangular,malAnime,malManga, tmdbMovie, tmdbSerie){
        var providers = [
            malAnime,
            malManga,
            tmdbMovie,
            tmdbSerie
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
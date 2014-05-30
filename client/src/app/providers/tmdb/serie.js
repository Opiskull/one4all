angular.module('providers').factory('tmdbSerie',['Restangular',function(restangular){
    var searchUrl = 'tmdb/serie/search';
    var detailUrl = 'providers/tmdb/serie-detail.html';
    var service = {
        title:'tmdb-serie',
        display:'The Movie DB - Serie',
        category:'serie',
        detailUrl:detailUrl,
        search:function(keyword){
            return restangular.one(searchUrl + '/' +keyword).getList().then(function(items){
                return restangular.stripRestangular(items);
            },function(){

            });
        }
    };
    return service;
}]);
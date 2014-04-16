angular.module('14all.providers').factory('malAnime',['Restangular',function(restangular){
    var searchUrl = 'mal/anime/search';
    var detailUrl = 'providers/mal/anime-detail.html';
    var service = {
        title:'mal-anime',
        category:'anime',
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
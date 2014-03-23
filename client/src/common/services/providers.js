angular.module('14all')
.factory('malManga',['Restangular',function(restangular){
    var searchUrl = 'mal/manga/search';
    var service = {
        title:'mal-manga',
        search:function(keyword){
            return restangular.one(searchUrl + '/' +keyword).getList();
        }
    };
    return service;
}])
.factory('malAnime',['Restangular',function(restangular){
    var searchUrl = 'mal/anime/search';
    var service = {
        title:'mal-anime',
        search:function(keyword){
            return restangular.one(searchUrl + '/' +keyword).getList();
        }
    };
    return service;
}]);
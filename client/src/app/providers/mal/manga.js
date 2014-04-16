angular.module('14all.providers').factory('malManga',['Restangular',function(restangular){
    var searchUrl = 'mal/manga/search';
    var detailUrl = 'providers/mal/manga-detail.html';
    var service = {
        title:'mal-manga',
        category:'manga',
        detailUrl:detailUrl,
        search:function(keyword){
            return restangular.one(searchUrl + '/' +keyword).getList().then(function(items){
                return restangular.stripRestangular(items);
            },function(){

            });
        }
    };
    return service;
}])
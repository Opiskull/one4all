angular.module('book')
    .factory('bookResource',['Restangular',function(restangular){
        var Books = restangular.all('book');
        Books.items = Books.getList().$object;
        return Books;
    }]);

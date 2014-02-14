angular.module('book.resource', ['restangular'])
    .factory('Books',['Restangular',function(restangular){
        var Books = restangular.all('book');
        Books.items = Books.getList().$object;
        return Books;
    }]);

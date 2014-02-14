angular.module('book',['ngRoute','book.resource'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/book', {
            templateUrl: 'book/list.html',
            controller: 'BookListCtrl',
            authRequired: true
        });
    }])
    .controller('BookListCtrl', ['$scope','Books','$location','$filter','valuesService', function ($scope,Books,$location,$filter,valuesService) {
        $scope.books = Books.items;
        $scope.dropped = function(item){
            valuesService.dropped(item)
        };
        $scope.remove = function(book){
            valuesService.removeWithDlg('book',$scope.books,book);
        };

        $scope.update = function(book){
            valuesService.update(book).then(function(updated){
                updated.editable = false;
            });
        };

        $scope.cancel = function(book){
            if(book.isnew){
                $scope.newbook= {};
            }
            book.editable = false;
        };

        $scope.add = function(){
            $scope.newbook = {isnew:true};
        };

        $scope.create = function(book){
            Books.post(book).then(function(addedBook){
                $scope.newbook = {};
                $scope.books.push(addedBook);
            },function(response){
                console.log("Error");
            });
        };

        $scope.increasePg = function(manga){
            valuesService.increasePg(manga);
        };

        $scope.decreasePg = function(manga){
            valuesService.decreasePg(manga);
        };

        $scope.finished = function(book){
            valuesService.finished(book);
        };
    }]);
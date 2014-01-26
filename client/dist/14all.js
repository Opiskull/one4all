angular.module('14all', ['ui.bootstrap','resources','manga','auth','templates.app'])
    .config(['RestangularProvider',function(RestangularProvider){
        RestangularProvider.setRestangularFields({
            id: "_id"
        });
        RestangularProvider.setBaseUrl('/api');
    }]);

angular.module('auth', ['ngRoute'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'auth/login.html',
            controller: ['authService','$routeParams',function(authService,$routeParams){
                if($routeParams.token){
                    authService.login($routeParams.token);
                }
            }]
        }).
        when('/logout',{
                templateUrl: 'auth/logout.html',
                controller: ['authService','$location',function(authService,$location){
                    authService.logout();
                }]
            });
    }])
    .run(['$rootScope', 'authService', function ($rootScope, authService) {
        authService.authenticate();

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
//            if (!auth.authorize(next.access)) {
//                if (auth.isLoggedIn()) $location.path('/');
//                else $location.path('/login');
//            }
        });
    }])
    .factory('authService', ['$http', 'Restangular','$location', function ($http, Restangular,$location) {
        var currentUser;

        function getUser(){
            currentUser = Restangular.oneUrl('/api/auth/info').get().$object;
            return currentUser;
        }

        function isLoggedIn(){
            return currentUser && currentUser.displayName;
        }

        function authenticate(){
            Restangular.setDefaultHeaders({'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
            getUser();
        }

        function setToken(access_token){
            localStorage.setItem('access_token',access_token);
            authenticate();
        }

        function login(access_token){
            setToken(access_token);
            $location.url('/');
        }

        function logout(){
            $http.post('/api/auth/logout')
                .success(function (data) {
                    localStorage.removeItem('access_token');
                    $location.url('/');
                });
        }

        function isAuthorized(){

        }

        var service = {
            isLoggedIn: isLoggedIn,
            login: login,
            authenticate: authenticate,
            getUser: getUser,
            logout: logout,
            isAuthorized: isAuthorized,
            currentUser: currentUser
        };
        return service;
    }]);

angular.module('manga',['ngRoute'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/manga', {
            templateUrl: 'manga/list.html',
            controller: 'MangaListCtrl'
        })
            .otherwise('/manga');
    }])
    .controller('MangaListCtrl', ['$scope','Mangas','$location','$filter', function ($scope,Mangas,$location,$filter) {
        $scope.mangas = Mangas.getList().$object;;

        $scope.filtered = function(){
            var filtered = $scope.mangas;
            if($scope.hideFinished){
                filtered = $filter('filter')(filtered,function(value){return !value.finished;});
            }
            if($scope.search){
                filtered = $filter('filter')(filtered,$scope.search);
            }
            return filtered;
        };

        function removeManga(manga){
            $scope.mangas.splice($scope.mangas.indexOf(manga),1);
        }

        $scope.remove = function(manga){
            manga.remove().then(function(){
                removeManga(manga);
                console.log(manga._id);
            });
        };

        $scope.update = function(manga){
            manga.put().then(function(updatedManga){
                manga.editable = false;
                console.log(updatedManga);
            });
        };

        $scope.cancel = function(manga){
            manga.editable = false;
            if(!manga._id)
                removeManga(manga);
        };

        $scope.save = function(manga){
            if(manga._id){
                $scope.update(manga);
            }
            else
                $scope.create(manga);
        };

        $scope.add = function(){
            mangas.push({editable:true});
        };

        $scope.create = function(manga){
            Mangas.post(manga).then(function(addedManga){
                removeManga(manga);
                $scope.mangas.push(addedManga);
                console.log("id", addedManga);
            },function(response){
                console.log("Error");
            });
        };

        $scope.finished = function(manga){
            manga.finished = !manga.finished;
            manga.put().then(function(updatedManga){
                console.log(updatedManga);
            });
        };

        $scope.getNextChapterUrl = function(manga){
            if(manga.finished)
                return "";
            var url = manga.url;
            var chapter = manga.chapter + 1;
            if(url)
                return url.replace("$$chapter$$",chapter);
            else
                return "";
        }
    }]);
angular.module('14all').controller('HeaderCtrl',['$scope','authService',function($scope,authService){
    $scope.isLoggedIn = authService.isLoggedIn;
    $scope.logout = authService.logout;
}]);

angular.module('resources', ['restangular'])
    .factory('Mangas',['Restangular',function(restangular){
        var Mangas = restangular.all('manga');
        return Mangas;
    }]);

angular.module('templates.app', ['auth/login.html', 'auth/logout.html', 'manga/list.html']);

angular.module("auth/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/login.html",
    "<div>\n" +
    "    Login Success!\n" +
    "</div>");
}]);

angular.module("auth/logout.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/logout.html",
    "<div>\n" +
    "    Logout success!\n" +
    "</div>");
}]);

angular.module("manga/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("manga/list.html",
    "<div class=\"table-responsive\">\n" +
    "<table class=\"table table-hover\">\n" +
    "    <thead>\n" +
    "    <tr><th>Title</th><th>Chapter</th><th>Url</th><th style=\"width: 210px\"></th></tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr ng-if=\"!manga.editable\" ng-repeat-start=\"manga in filtered()\" ng-class=\"{success:manga.finished}\">\n" +
    "        <td>{{manga.title}}</td>\n" +
    "        <td>{{manga.chapter}}</td>\n" +
    "        <td><a ng-href=\"{{getNextChapterUrl(manga)}}\">Next Chapter</a></td>\n" +
    "        <td>\n" +
    "            <div class=\"btn-group pull-right\">\n" +
    "                <a class=\"btn btn-default\" ng-class=\"{active:manga.finished}\" ng-click=\"finished(manga)\">finished</a>\n" +
    "                    <div class=\"btn-group\">\n" +
    "                        <button type=\"button\" class=\"btn btn-default dropdown-toggle\">\n" +
    "                            <span class=\"caret\"></span>\n" +
    "                        </button>\n" +
    "                        <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                            <li><a ng-model=\"manga.editable\" btn-checkbox>edit</a></li>\n" +
    "                            <li><a class=\"\" ng-click=\"remove(manga)\">delete</a></li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "            </div>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    <tr ng-if=\"manga.editable\" ng-repeat-end=\"\">\n" +
    "        <td><input class=\"form-control input-sm\" type=\"text\" ng-model=\"manga.title\"/></td>\n" +
    "        <td><input class=\"form-control input-sm\" type=\"number\" ng-model=\"manga.chapter\"/></td>\n" +
    "        <td><input class=\"form-control input-sm\" type=\"url\" ng-model=\"manga.url\"/></td>\n" +
    "        <td><div class=\"btn-group btn-group-justified\">\n" +
    "            <a class=\"btn btn-default\" ng-click=\"save(manga)\">save</a>\n" +
    "            <a class=\"btn btn-default\" ng-click=\"cancel(manga)\">cancel</a>\n" +
    "        </div></td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "    <tfoot>\n" +
    "        <tr><td colspan=\"4\"><button ng-click=\"add()\" class=\"btn btn-default\">add</button></td></tr>\n" +
    "    </tfoot>\n" +
    "</table>\n" +
    "</div>");
}]);

angular.module('templates.common', []);


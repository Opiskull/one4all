angular.module('14all', ['ui.bootstrap','resources','manga','auth','templates.app'])
    .config(['RestangularProvider',function(RestangularProvider){
        RestangularProvider.setRestangularFields({
            id: "_id"
        });
        RestangularProvider.setBaseUrl('/api');
    }])
    .controller('AppCtrl',['$scope','authService',function($scope,authService){
        $scope.isLoggedIn = authService.isLoggedIn;
        $scope.logout = authService.logout;
    }]);;

angular.module('auth', ['ngRoute'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'auth/login.html',
            controller: ['$scope','authService','$routeParams',function($scope,authService,$routeParams){
                if($routeParams.token){
                    authService.login($routeParams.token);
                }
                $scope.heading = 'Login';
                $scope.message='You need to login to view this page!';
            }]
        })
            .when('/notauthorized',{
                templateUrl: 'auth/message.html',
                controller: ['$scope','authService',function($scope,authService){
                    $scope.heading='Not Authorized';
                    $scope.message= 'You are not authorized to view this page!';
                }]
            })
            .when('/logout',{
                templateUrl: 'auth/message.html',
                controller: ['$scope','authService',function($scope,authService){
                    $scope.heading='Logout';
                    $scope.message= 'Your logout was a success!';
                    authService.logout();
                }]
            });
    }])
    .run(['$rootScope', 'authService','$location', function ($rootScope, authService,$location) {
        authService.authenticate();
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if((next.$$route) && (next.$$route.needsAuth)){
                if(!authService.isLoggedIn()){
                    $location.path("/login");
                }
            }
        });
    }])
    .factory('authService', ['Restangular','$location', function (Restangular,$location) {
        var authInfo;

        function getAuthInfo(){
            authInfo = Restangular.oneUrl('auth/info').get().$object;
            return authInfo;
        }

        function isLoggedIn(){
            return authInfo && authInfo.user && authInfo.user.username;
        }

        function authenticate(){
            Restangular.setDefaultHeaders({'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
            getAuthInfo();
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
            Restangular.oneUrl('auth/logout').post().then(function(data){
                localStorage.removeItem('access_token');
                authInfo = {};
                Restangular.setDefaultHeaders({'Authorization':''});
                $location.url('/');
            });
        }

        function isAuthorized(){

        }

        var service = {
            isLoggedIn: isLoggedIn,
            login: login,
            authenticate: authenticate,
            getAuthInfo: getAuthInfo,
            logout: logout,
            isAuthorized: isAuthorized,
            authInfo: authInfo
        };
        return service;
    }]);

angular.module('manga',['ngRoute'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/manga', {
            templateUrl: 'manga/list.html',
            controller: 'MangaListCtrl',
            needsAuth: true
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
            });
        };

        $scope.update = function(manga){
            manga.put().then(function(updatedManga){
                manga.editable = false;
                manga.updatedAt = updatedManga.updatedAt
            });
        };

        $scope.cancel = function(manga){
            if(manga.isnew){
                $scope.newmanga= {};
            }
            manga.editable = false;
        };

        $scope.add = function(){
            $scope.newmanga = {isnew:true};
        };

        $scope.create = function(manga){
            Mangas.post(manga).then(function(addedManga){
                $scope.newmanga = {};
                $scope.mangas.push(addedManga);
            },function(response){
                console.log("Error");
            });
        };

        $scope.finished = function(manga){
            manga.finished = !manga.finished;
            manga.put().then(function(updatedManga){
                manga.updatedAt = updatedManga.updatedAt
            });
        };

        $scope.increase = function(manga){
            manga.chapter +=1;
            manga.put().then(function(updatedManga){
                manga.updatedAt = updatedManga.updatedAt
            });
        };

        $scope.decrease = function(manga){
            manga.chapter -=1;
            manga.put().then(function(updatedManga){
                manga.updatedAt = updatedManga.updatedAt;
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
/**
 * Created by Christian on 28.01.14.
 */
angular.module('14all').filter('isFinished',function(){
    return function(input,enabled){
        if(!enabled){
            return input;
        }
        var ret = [];
        angular.forEach(input,function(item){
            if(!angular.isDefined(item.finished) && !item.finished){
                ret.push(item);
            }
        });
        return ret;
    }
});

angular.module('resources', ['restangular'])
    .factory('Mangas',['Restangular',function(restangular){
        var Mangas = restangular.all('manga');
        return Mangas;
    }]);

angular.module('templates.app', ['auth/login.html', 'auth/message.html', 'manga/list.html']);

angular.module("auth/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/login.html",
    "<div class=\"jumbotron\">\n" +
    "    <div class=\"container\">\n" +
    "    <h1>{{heading}}</h1>\n" +
    "        <p>{{message}}</p>\n" +
    "        <p><a class=\"btn btn-primary btn-lg\" href=\"/api/auth/google\" role=\"button\">Login with Google</a></p>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("auth/message.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/message.html",
    "<div class=\"jumbotron\">\n" +
    "    <div class=\"container\">\n" +
    "    <h1>{{heading}}</h1>\n" +
    "        <p>{{message}}</p>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("manga/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("manga/list.html",
    "<div class=\"table-responsive\">\n" +
    "<table class=\"table table-hover\">\n" +
    "    <thead>\n" +
    "    <tr>\n" +
    "        <th><a href=\"\" ng-click=\"predicate = 'title'; reverse=!reverse\">Title</a></th>\n" +
    "        <th style=\"width: 100px\"><a href=\"\" ng-click=\"predicate = 'chapter'; reverse=!reverse\">Chapter</a></th>\n" +
    "        <th style=\"width: 160px\"><a href=\"\" ng-click=\"predicate = 'updatedAt'; reverse=!reverse\">Last Modified</a></th>\n" +
    "        <th style=\"width: 100px\">Url</th>\n" +
    "        <th style=\"width: 210px\"></th></tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr ng-if=\"!manga.editable\" ng-repeat-start=\"manga in mangas | isFinished:excludeFinished | filter:search | orderBy:[predicate]:reverse\" ng-class=\"{success:manga.finished,bold:manga.finished}\">\n" +
    "        <td>{{manga.title}}</td>\n" +
    "        <td>\n" +
    "            <a href=\"\" ng-click=\"decrease(manga)\" class=\"btn btn-default btn-xs pull-left\" ng-disabled=\"manga.finished\"><span class=\"glyphicon glyphicon-minus\"></span></a>\n" +
    "            <a href=\"\" ng-click=\"increase(manga)\" class=\"btn btn-default btn-xs pull-right\" ng-disabled=\"manga.finished\"><span class=\"glyphicon glyphicon-plus\"></span></a>\n" +
    "         <span class=\"pull-right\">{{manga.chapter}}</span>\n" +
    "        </td>\n" +
    "        <td>{{manga.updatedAt | date:'dd/MM/yyyy HH:mm:ss'}}</td>\n" +
    "        <td><a href=\"{{getNextChapterUrl(manga)}}\" ng-if=\"!manga.finished\">Next Chapter</a></td>\n" +
    "        <td>\n" +
    "            <div class=\"btn-group pull-right\">\n" +
    "                <a class=\"btn btn-default\" ng-class=\"{active:manga.finished}\" href=\"\" ng-click=\"finished(manga)\">finished</a>\n" +
    "                    <div class=\"btn-group\">\n" +
    "                        <button type=\"button\" class=\"btn btn-default dropdown-toggle\">\n" +
    "                            <span class=\"caret\"></span>\n" +
    "                        </button>\n" +
    "                        <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                            <li><a ng-model=\"manga.editable\" btn-checkbox href=\"\">edit</a></li>\n" +
    "                            <li><a ng-click=\"remove(manga)\" href=\"\">delete</a></li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "            </div>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    <tr ng-if=\"manga.editable\" ng-repeat-end=\"\">\n" +
    "        <td><input class=\"form-control input-sm\" type=\"text\" ng-model=\"manga.title\"/></td>\n" +
    "        <td><input class=\"form-control input-sm\" type=\"number\" ng-model=\"manga.chapter\"/></td>\n" +
    "        <td>{{manga.updatedAt | date:'dd/MM/yyyy HH:mm:ss'}}</td>\n" +
    "        <td><input class=\"form-control input-sm\" type=\"url\" ng-model=\"manga.url\"/></td>\n" +
    "        <td><div class=\"btn-group btn-group-justified\">\n" +
    "            <a class=\"btn btn-default\" ng-click=\"update(manga)\">save</a>\n" +
    "            <a class=\"btn btn-default\" ng-click=\"cancel(manga)\">cancel</a>\n" +
    "        </div></td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "    <tfoot>\n" +
    "    <tr ng-if=\"newmanga.isnew\">\n" +
    "        <td><input class=\"form-control input-sm\" type=\"text\" ng-model=\"newmanga.title\" placeholder=\"title\"/></td>\n" +
    "        <td><input class=\"form-control input-sm\" type=\"number\" ng-model=\"newmanga.chapter\"/></td>\n" +
    "        <td colspan=\"2\"><input class=\"form-control input-sm\" type=\"url\" ng-model=\"newmanga.url\" placeholder=\"url $$chapter$$ will be replaced with next chapter\"/></td>\n" +
    "        <td><div class=\"btn-group btn-group-justified\">\n" +
    "            <a class=\"btn btn-default\" ng-click=\"create(newmanga)\">save</a>\n" +
    "            <a class=\"btn btn-default\" ng-click=\"cancel(newmanga)\">cancel</a>\n" +
    "        </div></td>\n" +
    "    </tr>\n" +
    "        <tr ng-if=\"!newmanga.isnew\"><td colspan=\"5\"><button ng-click=\"add()\" class=\"btn btn-default\">add</button></td></tr>\n" +
    "    </tfoot>\n" +
    "</table>\n" +
    "</div>");
}]);

angular.module('templates.common', []);


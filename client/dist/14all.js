angular.module('14all', ['ui.bootstrap','manga','movie','auth','serie','templates.app'])
    .config(['RestangularProvider',function(RestangularProvider){
        RestangularProvider.setRestangularFields({
            id: "_id"
        });
        RestangularProvider.setBaseUrl('/api');
    }])
    .controller('AppCtrl',['$scope','authService',function($scope,authService){
        $scope.isLoggedIn = authService.isLoggedIn;
        $scope.logout = authService.logout;
    }]);

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
        authService.authenticate().then(function(){
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if((next.$$route) && (next.$$route.authRequired)){
                    if(!authService.isLoggedIn()){
                        $location.path("/login");
                    }
                }
            });
        });
    }])
    .factory('authService', ['Restangular','$location', function (Restangular,$location) {
        var authInfo;

        function getAuthInfo(){
             return Restangular.oneUrl('auth/info').get().then(function(response){
                authInfo = response;
            },function(){
                 authInfo = {};
             });
        }

        function isLoggedIn(){
            return authInfo && authInfo.user && authInfo.user.username;
        }

        function authenticate(){
            Restangular.setDefaultHeaders({'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
            return getAuthInfo();
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

angular.module('manga',['ngRoute','manga.resource'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/manga', {
            templateUrl: 'manga/list.html',
            controller: 'MangaListCtrl',
            authRequired: true
        });
    }])
    .controller('MangaListCtrl', ['$scope','Mangas','$location','$filter', function ($scope,Mangas,$location,$filter) {
        $scope.mangas = Mangas.getList().$object;;

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
angular.module('manga.resource', ['restangular'])
    .factory('Mangas',['Restangular',function(restangular){
        var Mangas = restangular.all('manga');
        return Mangas;
    }]);

angular.module('movie',['ngRoute','movie.resource'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/movie', {
            templateUrl: 'movie/list.html',
            controller: 'MovieListCtrl',
            authRequired: true
        });
    }])
    .controller('MovieListCtrl', ['$scope','Movies','$location','$filter', function ($scope,Movies,$location,$filter) {
        $scope.movies = Movies.getList().$object;;

        function removeMovie(movie){
            $scope.movies.splice($scope.movies.indexOf(movie),1);
        }

        $scope.remove = function(movie){
            movie.remove().then(function(){
                removeMovie(movie);
            });
        };

        $scope.update = function(movie){
            movie.put().then(function(updatedMovie){
                movie.editable = false;
                movie.updatedAt = updatedMovie.updatedAt
            });
        };

        $scope.cancel = function(movie){
            if(movie.isnew){
                $scope.newmovie= {};
            }
            movie.editable = false;
        };

        $scope.add = function(){
            $scope.newmovie = {isnew:true};
        };

        $scope.create = function(movie){
            Movies.post(movie).then(function(addedMovie){
                $scope.newmovie = {};
                $scope.movies.push(addedMovie);
            },function(response){
                console.log("Error");
            });
        };

        $scope.finished = function(movie){
            movie.finished = !movie.finished;
            movie.put().then(function(updatedMovie){
                movie.updatedAt = updatedMovie.updatedAt
            });
        };
    }]);
angular.module('movie.resource', ['restangular'])
    .factory('Movies',['Restangular',function(restangular){
        var Movies = restangular.all('movie');
        return Movies;
    }]);

angular.module('serie',['ngRoute','serie.resource'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/serie', {
            templateUrl: 'serie/list.html',
            controller: 'SerieListCtrl',
            authRequired: true
        });
    }])
    .controller('SerieListCtrl', ['$scope','Series','$location','$filter', function ($scope,Series,$location,$filter) {
        $scope.series = Series.getList().$object;;

        function removeSerie(serie){
            $scope.series.splice($scope.series.indexOf(serie),1);
        }

        $scope.remove = function(serie){
            serie.remove().then(function(){
                removeSerie(serie);
            });
        };

        $scope.update = function(serie){
            serie.put().then(function(updatedSerie){
                serie.editable = false;
                serie.updatedAt = updatedSerie.updatedAt
            });
        };

        $scope.cancel = function(serie){
            if(serie.isnew){
                $scope.newserie= {};
            }
            serie.editable = false;
        };

        $scope.add = function(){
            $scope.newserie = {isnew:true};
        };

        $scope.create = function(serie){
            Series.post(serie).then(function(addedSerie){
                $scope.newserie = {};
                $scope.series.push(addedSerie);
            },function(response){
                console.log("Error");
            });
        };

        $scope.finished = function(serie){
            serie.finished = !serie.finished;
            serie.put().then(function(updatedSerie){
                serie.updatedAt = updatedSerie.updatedAt
            });
        };

        $scope.increaseSe = function(serie){
            serie.season +=1;
            serie.put().then(function(updatedSerie){
                serie.updatedAt = updatedSerie.updatedAt
            });
        };

        $scope.decreaseSe = function(serie){
            serie.season -=1;
            serie.put().then(function(updatedSerie){
                serie.updatedAt = updatedSerie.updatedAt;
            });
        };

        $scope.increaseEp = function(serie){
            serie.episode +=1;
            serie.put().then(function(updatedSerie){
                serie.updatedAt = updatedSerie.updatedAt
            });
        };

        $scope.decreaseEp = function(serie){
            serie.episode -=1;
            serie.put().then(function(updatedSerie){
                serie.updatedAt = updatedSerie.updatedAt;
            });
        };
    }]);
angular.module('serie.resource', ['restangular'])
    .factory('Series',['Restangular',function(restangular){
        var Series = restangular.all('serie');
        return Series;
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
            if(angular.isUndefined(item.finished) || !item.finished){
                ret.push(item);
            }
        });
        return ret;
    }
});

angular.module('templates.app', ['auth/login.html', 'auth/message.html', 'manga/list.html', 'movie/list.html', 'serie/list.html']);

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

angular.module("movie/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("movie/list.html",
    "<div class=\"table-responsive\">\n" +
    "<table class=\"table table-hover\">\n" +
    "    <thead>\n" +
    "    <tr>\n" +
    "        <th><a href=\"\" ng-click=\"predicate = 'title'; reverse=!reverse\">Title</a></th>\n" +
    "        <th style=\"width: 160px\"><a href=\"\" ng-click=\"predicate = 'updatedAt'; reverse=!reverse\">Last Modified</a></th>\n" +
    "        <th style=\"width: 210px\"></th></tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr ng-if=\"!movie.editable\" ng-repeat-start=\"movie in movies | isFinished:excludeFinished | filter:search | orderBy:[predicate]:reverse\" ng-class=\"{success:movie.finished,bold:movie.finished}\">\n" +
    "        <td>{{movie.title}}</td>\n" +
    "        <td>{{movie.updatedAt | date:'dd/MM/yyyy HH:mm:ss'}}</td>\n" +
    "        <td>\n" +
    "            <div class=\"btn-group pull-right\">\n" +
    "                <a class=\"btn btn-default\" ng-class=\"{active:movie.finished}\" href=\"\" ng-click=\"finished(movie)\">finished</a>\n" +
    "                    <div class=\"btn-group\">\n" +
    "                        <button type=\"button\" class=\"btn btn-default dropdown-toggle\">\n" +
    "                            <span class=\"caret\"></span>\n" +
    "                        </button>\n" +
    "                        <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                            <li><a ng-model=\"movie.editable\" btn-checkbox href=\"\">edit</a></li>\n" +
    "                            <li><a ng-click=\"remove(movie)\" href=\"\">delete</a></li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "            </div>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    <tr ng-if=\"movie.editable\" ng-repeat-end=\"\">\n" +
    "        <td><input class=\"form-control input-sm\" type=\"text\" ng-model=\"movie.title\"/></td>\n" +
    "        <td>{{movie.updatedAt | date:'dd/MM/yyyy HH:mm:ss'}}</td>\n" +
    "        <td><div class=\"btn-group btn-group-justified\">\n" +
    "            <a class=\"btn btn-default\" ng-click=\"update(movie)\">save</a>\n" +
    "            <a class=\"btn btn-default\" ng-click=\"cancel(movie)\">cancel</a>\n" +
    "        </div></td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "    <tfoot>\n" +
    "    <tr ng-if=\"newmovie.isnew\">\n" +
    "        <td colspan=\"2\"><input class=\"form-control input-sm\" type=\"text\" ng-model=\"newmovie.title\" placeholder=\"title\"/></td>\n" +
    "        <td><div class=\"btn-group btn-group-justified\">\n" +
    "            <a class=\"btn btn-default\" ng-click=\"create(newmovie)\">save</a>\n" +
    "            <a class=\"btn btn-default\" ng-click=\"cancel(newmovie)\">cancel</a>\n" +
    "        </div></td>\n" +
    "    </tr>\n" +
    "        <tr ng-if=\"!newmovie.isnew\"><td colspan=\"3\"><button ng-click=\"add()\" class=\"btn btn-default\">add</button></td></tr>\n" +
    "    </tfoot>\n" +
    "</table>\n" +
    "</div>");
}]);

angular.module("serie/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("serie/list.html",
    "<div class=\"table-responsive\">\n" +
    "<table class=\"table table-hover\">\n" +
    "    <thead>\n" +
    "    <tr>\n" +
    "        <th><a href=\"\" ng-click=\"predicate = 'title'; reverse=!reverse\">Title</a></th>\n" +
    "        <th style=\"width: 100px\"><a href=\"\" ng-click=\"predicate = 'season'; reverse=!reverse\">Season</a></th>\n" +
    "        <th style=\"width: 100px\"><a href=\"\" ng-click=\"predicate = 'episode'; reverse=!reverse\">Episode</a></th>\n" +
    "        <th style=\"width: 160px\"><a href=\"\" ng-click=\"predicate = 'updatedAt'; reverse=!reverse\">Last Modified</a></th>\n" +
    "        <th style=\"width: 210px\"></th></tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr ng-if=\"!serie.editable\" ng-repeat-start=\"serie in series | isFinished:excludeFinished | filter:search | orderBy:[predicate]:reverse\" ng-class=\"{success:serie.finished,bold:serie.finished}\">\n" +
    "        <td>{{serie.title}}</td>\n" +
    "        <td>\n" +
    "            <a href=\"\" ng-click=\"decreaseSe(serie)\" class=\"btn btn-default btn-xs pull-left\" ng-disabled=\"serie.finished\"><span class=\"glyphicon glyphicon-minus\"></span></a>\n" +
    "            <a href=\"\" ng-click=\"increaseSe(serie)\" class=\"btn btn-default btn-xs pull-right\" ng-disabled=\"serie.finished\"><span class=\"glyphicon glyphicon-plus\"></span></a>\n" +
    "         <span class=\"pull-right\">{{serie.season}}</span>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "            <a href=\"\" ng-click=\"decreaseEp(serie)\" class=\"btn btn-default btn-xs pull-left\" ng-disabled=\"serie.finished\"><span class=\"glyphicon glyphicon-minus\"></span></a>\n" +
    "            <a href=\"\" ng-click=\"increaseEp(serie)\" class=\"btn btn-default btn-xs pull-right\" ng-disabled=\"serie.finished\"><span class=\"glyphicon glyphicon-plus\"></span></a>\n" +
    "            <span class=\"pull-right\">{{serie.episode}}</span>\n" +
    "        </td>\n" +
    "        <td>{{serie.updatedAt | date:'dd/MM/yyyy HH:mm:ss'}}</td>\n" +
    "        <td>\n" +
    "            <div class=\"btn-group pull-right\">\n" +
    "                <a class=\"btn btn-default\" ng-class=\"{active:serie.finished}\" href=\"\" ng-click=\"finished(serie)\">finished</a>\n" +
    "                    <div class=\"btn-group\">\n" +
    "                        <button type=\"button\" class=\"btn btn-default dropdown-toggle\">\n" +
    "                            <span class=\"caret\"></span>\n" +
    "                        </button>\n" +
    "                        <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                            <li><a ng-model=\"serie.editable\" btn-checkbox href=\"\">edit</a></li>\n" +
    "                            <li><a ng-click=\"remove(serie)\" href=\"\">delete</a></li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "            </div>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    <tr ng-if=\"serie.editable\" ng-repeat-end=\"\">\n" +
    "        <td><input class=\"form-control input-sm\" type=\"text\" ng-model=\"serie.title\"/></td>\n" +
    "        <td><input class=\"form-control input-sm\" type=\"number\" ng-model=\"serie.season\"/></td>\n" +
    "        <td><input class=\"form-control input-sm\" type=\"number\" ng-model=\"serie.episode\"/></td>\n" +
    "        <td>{{serie.updatedAt | date:'dd/MM/yyyy HH:mm:ss'}}</td>\n" +
    "        <td><div class=\"btn-group btn-group-justified\">\n" +
    "            <a class=\"btn btn-default\" ng-click=\"update(serie)\">save</a>\n" +
    "            <a class=\"btn btn-default\" ng-click=\"cancel(serie)\">cancel</a>\n" +
    "        </div></td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "    <tfoot>\n" +
    "    <tr ng-if=\"newserie.isnew\">\n" +
    "        <td><input class=\"form-control input-sm\" type=\"text\" ng-model=\"newserie.title\" placeholder=\"title\"/></td>\n" +
    "        <td><input class=\"form-control input-sm\" type=\"number\" ng-model=\"newserie.season\"/></td>\n" +
    "        <td><input class=\"form-control input-sm\" type=\"number\" ng-model=\"newserie.episode\"/></td>\n" +
    "        <td><div class=\"btn-group btn-group-justified\">\n" +
    "            <a class=\"btn btn-default\" ng-click=\"create(newserie)\">save</a>\n" +
    "            <a class=\"btn btn-default\" ng-click=\"cancel(newserie)\">cancel</a>\n" +
    "        </div></td>\n" +
    "    </tr>\n" +
    "        <tr ng-if=\"!newserie.isnew\"><td colspan=\"5\"><button ng-click=\"add()\" class=\"btn btn-default\">add</button></td></tr>\n" +
    "    </tfoot>\n" +
    "</table>\n" +
    "</div>");
}]);

angular.module('templates.common', []);


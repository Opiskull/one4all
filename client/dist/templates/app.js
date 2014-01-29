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

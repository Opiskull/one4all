angular.module('templates.app', ['auth/message.html', 'manga/list.html']);

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
    "    <tr><th>Title</th><th style=\"width: 90px\">Chapter</th><th>Url</th><th style=\"width: 210px\"></th></tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr ng-if=\"!manga.editable\" ng-repeat-start=\"manga in filtered()\" ng-class=\"{success:manga.finished}\">\n" +
    "        <td>{{manga.title}}</td>\n" +
    "        <td>\n" +
    "            <a href=\"\" ng-click=\"decrease(manga)\" class=\"btn btn-default btn-xs pull-left\"><span class=\"glyphicon glyphicon-minus\"></span></a>\n" +
    "            <a href=\"\" ng-click=\"increase(manga)\" class=\"btn btn-default btn-xs pull-right\"><span class=\"glyphicon glyphicon-plus\"></span></a>\n" +
    "         <span class=\"pull-right\">{{manga.chapter}}</span>\n" +
    "        </td>\n" +
    "        <td><a ng-href=\"{{getNextChapterUrl(manga)}}\">Next Chapter</a></td>\n" +
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

angular.module('one4all').directive('tags', [function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<ul class="tags-list" ng-show="items.length > 0"><li class="bold">Tags</li><li ng-repeat="tag in items">{{::tag.text}}</li></ul>',
        link: function (scope, element, attrs) {
        },
        scope: {
            items: '='
        }
    };
}]);
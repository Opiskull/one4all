angular.module('one4all').directive('ratingNuts', ['itemService', function (itemService) {
    var enabledClass = 'nut-enabled';
    var disabledClass = 'nut-disabled';
    var hoverClass = 'nut-hover';

    function resetRating(nuts){
        nuts.removeClass(hoverClass);
        nuts.removeClass(enabledClass);
        nuts.addClass(disabledClass);
    }

    function setRating(nuts, rating) {
        if (angular.isNumber(rating)) {
            resetRating(nuts);
            for (var i = 0; i < nuts.length; i++) {
                var itemIndex = i + 1;
                if (itemIndex <= rating) {
                    var starElement = angular.element(nuts[i]);
                    starElement.removeClass(disabledClass);
                    starElement.addClass(enabledClass);
                }
            }
        }
    }

    function setHoverRating(nuts, rating){
        if (angular.isNumber(rating)) {
            resetRating(nuts);
            for (var i = 0; i < nuts.length; i++) {
                var itemIndex = i + 1;
                if (itemIndex <= rating) {
                    var starElement = angular.element(nuts[i]);
                    starElement.removeClass(disabledClass);
                    starElement.addClass(hoverClass);
                }
            }
        }
    }

    return {
        restrict: 'E',
        replace: true,
        template: '<div class="rating-nuts">' +
        '<span class="nut nut-disabled" ng-click="setRating(1)" value="1"></span>' +
        '<span class="nut nut-disabled" ng-click="setRating(2)" value="2"></span>' +
        '<span class="nut nut-disabled" ng-click="setRating(3)" value="3"></span>' +
        '<span class="nut nut-disabled" ng-click="setRating(4)" value="4"></span>' +
        '<span class="nut nut-disabled" ng-click="setRating(5)" value="5"></span>' +
        '</div>',
        link: function (scope, element, attrs) {
            var nuts = element.children();
            nuts.on('mouseenter',function(){
                setHoverRating(nuts, parseInt(angular.element(this).attr('value')));
            });
            element.on('mouseleave',function(){
                setHoverRating(nuts, 0);
                setRating(nuts, scope.item[scope.property]);
            });
            scope.property = scope.$eval(attrs.property);
            scope.setRating = function (value) {
                if (scope.item[scope.property] == value) {
                    value = 0;
                }
                scope.item[scope.property] = value;
                itemService.update(scope.item);
                setRating(nuts, value);
            };
            setRating(nuts, scope.item[scope.property]);
        },
        scope: {
            item: '='
        }
    };
}]);
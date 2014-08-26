angular.module('14all').directive('ratingStars', ['itemService', function (itemService){
    var enabledClass = 'nut-enabled';
    var disabledClass = 'nut-disabled';

    function setRating(element,rating){
        if(angular.isNumber(rating)){
            var stars = element.children();
            stars.removeClass(enabledClass);
            stars.addClass(disabledClass);
            for(var i = 0; i < stars.length; i++){
                var itemIndex = i +1;
                if(itemIndex <= rating){
                    var starElement = angular.element(stars[i]);
                    starElement.removeClass(disabledClass);
                    starElement.addClass(enabledClass);
                }
            }
        }
    }

    return {
        restrict: 'E',
        replace: true,
        template: '<div class="rating-stars">' +
        '<span class="nut nut-disabled" ng-click="setRating(1)"></span>' +
        '<span class="nut nut-disabled" ng-click="setRating(2)"></span>' +
        '<span class="nut nut-disabled" ng-click="setRating(3)"></span>' +
        '<span class="nut nut-disabled" ng-click="setRating(4)"></span>' +
        '<span class="nut nut-disabled" ng-click="setRating(5)"></span>' +
        '</div>',
        link: function (scope, element, attrs) {
            scope.property = scope.$eval(attrs.property);
            scope.setRating = function(value){
                if(scope.item[scope.property] == value){
                    value = 0;
                }
                scope.item[scope.property] = value;
                itemService.update(scope.item);
                setRating(element, value);
            };
            setRating(element,scope.item[scope.property]);
        },
        scope: {
            item: '='
        }
    };
}]);
angular.module('one4all').directive('focusMe', ['$timeout', function ($timeout) {
    return {
        //scope: true,   // optionally create a child scope
        link: function (scope, element, attrs) {
            var model = scope.$eval(attrs.focusMe);
            scope.$watch(model, function (value) {
                if (value === true) {
                    $timeout(function () {
                        element[0].focus();
                    });
                }
            });
            // to address @blesh's comment, set attribute value to 'false'
            // on blur event:
            element.bind('blur', function () {
                //scope.$apply(model.assign(scope, false));
            });
        }
    };
}]);
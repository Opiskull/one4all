angular.module('one4all').directive('statsButton', ['itemService', '$compile', function (itemService, $compile) {
    return {
        priority: 1100,
        template: '',
        restrict: 'E',
        scope: {
            item: '=model'
        },
        link: function ($scope, $element, $attr) {
            var defaultStats = ['finished', 'dropped', 'paused'];
            var enabledStats = $scope.$eval($attr.stats);
            if (!enabledStats) {
                enabledStats = defaultStats;
            }
            var group = angular.element('<div class="btn-group"></div>');
            if (statEnabled('finished'))
                group.append('<a class="btn btn-default" title="finished" ng-click="setState(\'finished\')"><i class="glyphicon glyphicon-ok"></i></a>');
            if (statEnabled('paused'))
                group.append('<a class="btn btn-default" title="paused" ng-click="setState(\'paused\')"><i class="glyphicon glyphicon-pause"></i></a>');
            if (statEnabled('dropped'))
                group.append('<a class="btn btn-default" title="dropped" ng-click="setState(\'dropped\')"><i class="glyphicon glyphicon-ban-circle"></i></a>');
            $compile(group)($scope);
            $element.append(group);

            function setState(state) {
                if (state === $scope.item.state) {
                    $scope.item.state = '';
                } else {
                    $scope.item.state = state;
                }
            }

            function setViewToState(state) {
                if (state == undefined) return;
                var allStats = $element.find('a');
                allStats.removeClass('active');
                angular.forEach(allStats, function (element) {
                    var aElement = angular.element(element);
                    if (aElement.attr('title') === state)
                        aElement.addClass('active');
                });
            }

            function statEnabled(state) {
                return enabledStats.indexOf(state) !== -1;
            }

            $scope.setState = function (state) {
                setState(state);
                itemService.update($scope.item).then(function (item) {
                    setViewToState(item.state);
                });
            };
            setViewToState($scope.item.state);
        }
    };
}]);
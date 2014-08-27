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
                group.append('<a class="btn btn-default" title="finished" ng-click="setStats(\'finished\')"><i class="glyphicon glyphicon-ok"></i></a>');
            if (statEnabled('paused'))
                group.append('<a class="btn btn-default" title="paused" ng-click="setStats(\'paused\')"><i class="glyphicon glyphicon-pause"></i></a>');
            if (statEnabled('dropped'))
                group.append('<a class="btn btn-default" title="dropped" ng-click="setStats(\'dropped\')"><i class="glyphicon glyphicon-ban-circle"></i></a>');
            $compile(group)($scope);
            $element.append(group);

            function setStats(stat) {
                var oldValue = $scope.item.stats[stat];
                angular.forEach(defaultStats, function (value) {
                    $scope.item.stats[value] = false;
                });
                $scope.item.stats[stat] = !oldValue;
            }

            function setViewFromStats() {
                var allStats = $element.find('a');
                allStats.removeClass('active');
                angular.forEach($scope.item.stats, function (value, key) {
                    if (value) {
                        angular.forEach(allStats, function (element) {
                            var aElement = angular.element(element);
                            if (aElement.attr('title') === key)
                                aElement.addClass('active');
                        });
                    }
                });
            }

            function statEnabled(stat) {
                return enabledStats.indexOf(stat) !== -1;
            }

            $scope.setStats = function (stat) {
                setStats(stat);
                itemService.update($scope.item);
                setViewFromStats();
            };

            if (!$scope.item.stats)
                $scope.item.stats = {};

            setViewFromStats();
        }
    };
}]);
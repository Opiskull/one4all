angular.module('one4all').directive('statsButton', ['$compile', function ($compile) {
    return {
        priority: 1100,
        template: '',
        restrict: 'E',
        scope: {
            item: '=model',
            update: '&'
        },
        link: function ($scope, $element, $attr) {
            var defaultStats = ['finished', 'dropped', 'paused', 'watching'];
            var enabledStats = $scope.$eval($attr.stats) || defaultStats;
            var stats = [
                {title: 'finished', icon: 'glyphicon-ok'},
                {title: 'paused', icon: 'glyphicon-pause'},
                {title: 'dropped', icon: 'glyphicon-ban-circle'},
                {title: 'watching', icon: 'glyphicon-play'}
            ];
            var group = angular.element('<div class="btn-group"></div>');
            angular.forEach(stats, function (stat) {
                if (statEnabled(stat.title))
                    group.append('<a class="btn btn-default" title="' + stat.title + '" ng-click="setState(\'' + stat.title + '\')"><i class="glyphicon ' + stat.icon + '"></i></a>');
            });
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
                $scope.update().success(function (item) {
                    setViewToState(item.state);
                });
            };
            setViewToState($scope.item.state);
        }
    };
}]);
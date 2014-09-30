angular.module('one4all').directive('filterBar', ['$rootScope', '$timeout', 'settingsService', 'tagsService', function ($rootScope, $timeout, settingsService, tagsService) {
    return {
        restrict: 'EA',
        templateUrl: 'directives/filter-bar.html',
        scope: {
            display: '='
        },
        link: function ($scope, $element, $attr) {

            function setStats(value) {
                angular.forEach(settingsService.settings.filters.stats, function (stat, statName) {
                    settingsService.settings.filters.stats[statName] = value;
                });
            }

            $scope.settings = settingsService.settings;

            $scope.filterItems = function () {
                $timeout(function () {
                    $rootScope.$emit('filter');
                });
            };

            $scope.deleteClientSettings = function () {
                settingsService.deleteClientSettings();
            };

            $scope.saveClientSettings = function () {
                settingsService.saveClientSettings();
            };

            $scope.resetClientSettings = function () {
                settingsService.resetClientSettings();
                $scope.settings = settingsService.settings;
            };

            $scope.selectAllStats = function () {
                setStats(true);
                $scope.filterItems();
            };

            $scope.deselectAllStats = function () {
                setStats(false);
                $scope.filterItems();
            };

            $scope.getUserTags = function (query) {
                return tagsService.getUserTags(query);
            }
        }
    };
}]);
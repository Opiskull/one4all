angular.module('14all').directive('statsButton', ['itemService',function(itemService) {
    return {
        template:
            '<div bindonce="item.stats" class="btn-group"> \
                <a ng-if="statEnabled(\'finished\')" class="btn btn-default" \
                bo-class="{active:item.stats.finished}" title="finished" ng-click="setStats(\'finished\')"><i class="glyphicon glyphicon-ok"></i></a>\
                <a ng-if="statEnabled(\'dropped\')" class="btn btn-default" \
                bo-class="{active:item.stats.dropped}" title="dropped" ng-click="setStats(\'dropped\')"><i class="glyphicon glyphicon-ban-circle"></i></a>\
                <a ng-if="statEnabled(\'paused\')" class="btn btn-default" \
                bo-class="{active:item.stats.paused}" title="paused" ng-click="setStats(\'paused\')"><i class="glyphicon glyphicon-pause"></i></a>\
            </div>',
        restrict: 'E',
        scope: {
            item: '=model',
            stats: '='
        },
        link : function($scope,$element,$attr){
            var defaultStats = ['finished','dropped','paused'];
            var stats = [];
            if($scope.stats){
                stats = $scope.stats;
            } else {
                stats = defaultStats;
            }

            $scope.statEnabled = function(stat){
                return stats.indexOf(stat) !== -1;
            };

            $scope.setStats = function(stat){
                if(!$scope.item.stats)
                    $scope.item.stats = {};

                var oldState = $scope.item.stats[stat];
                angular.forEach(defaultStats, function (value){
                    $scope.item.stats[value] = false;
                });
                $scope.item.stats[stat] = !oldState;

                var allStats =  $element.find('a');
                allStats.removeClass('active');
                if($scope.item.stats[stat]){
                    angular.forEach(allStats, function(element){
                        var aElement = angular.element(element);
                        if(aElement.attr('title') === stat)
                            aElement.addClass('active');
                    });
                }
                itemService.update($scope.item);
            };
        }
    };
}]);
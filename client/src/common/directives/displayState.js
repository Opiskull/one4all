angular.module('14all').directive('displayState', [function() {
    function isValid(state){
        return (angular.isDefined(state) && state);
    }
    return {
        restrict: 'A',
        scope:{
            state: '=displayState'
        },
        link : function($scope,$element,$attr){
            $scope.$watch('state',function(state){
                if(state){
                    $element.toggleClass('bold success',isValid(state.finished));
                    $element.toggleClass('danger',isValid(state.dropped));
                }
            },true);
        }
    };
}]);
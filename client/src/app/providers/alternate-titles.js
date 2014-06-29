angular.module('providers').directive('alternateTitles',[function() {
    return {
        restrict:'E',
        replace:true,
        template:'<span ng-repeat="title in titles">{{title.title}}<span ng-if="!$last">; </span></span>',
        link: function(scope, element, attrs) {

        },
        scope:{
            titles:'='
        }
    };
}]);
angular.module('providers').directive('alternateTitles',[function() {
    return {
        restrict:'E',
        replace:true,
        template:'<span bindonce ng-repeat="title in titles"><span bo-text="title.title"></span><span ng-if="!$last">; </span></span>',
        link: function(scope, element, attrs) {

        },
        scope:{
            titles:'='
        }
    };
}]);
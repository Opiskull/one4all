angular.module('14all', ['ui.bootstrap','resources','manga','auth','templates.app'])
    .config(['RestangularProvider',function(RestangularProvider){
        RestangularProvider.setRestangularFields({
            id: "_id"
        });
        RestangularProvider.setBaseUrl('/api');
        if(localStorage.getItem('access_token')){
            RestangularProvider.setDefaultHeaders({'Authorization':'Bearer '+ localStorage.getItem('access_token')});
        }
    }]);

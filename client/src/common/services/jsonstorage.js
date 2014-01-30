angular.module('14all').factory('jsonStorage',[function(){
    function getItem(key){
        return localStorage.getItem(key);
    }

    function setItem(key,value){
        localStorage.setItem(key,value);
    }

    function getJson(key){
        return JSON.parse(getItem(key));
    }

    function setJson(key,value){
        setItem(key,JSON.stringify(value));
    }

    var service = {
        getItem: getItem,
        setItem: setItem,
        getJson: getJson,
        setJson: setJson
    };

    return service;
}]);

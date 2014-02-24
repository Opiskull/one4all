/**
 * Created by Christian on 28.01.14.
 */
angular.module('14all').filter('objectFilter',function(){

    function enabledValue(enabled,value){
        return enabled && (angular.isUndefined(value) || !value);
    }

    return function(input,filters){
        var ret = [];
        angular.forEach(input,function(item){
            if(filters.excludeFinished || filters.excludeDropped){
                if(enabledValue(filters.excludeFinished,item.finished) || enabledValue(filters.excludeDropped,item.dropped)){
                    ret.push(item);
                }
            }
            else{
                ret.push(item);
            }
        });
        return ret;
    }
});

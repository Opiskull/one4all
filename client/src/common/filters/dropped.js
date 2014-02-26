/**
 * Created by Christian on 28.01.14.
 */
angular.module('14all').filter('isDropped',function(){
    return function(input,enabled){
        if(!enabled){
            return input;
        }
        var ret = [];
        angular.forEach(input,function(item){
            if(angular.isDefined(item.stats) && (angular.isUndefined(item.stats.dropped) || !item.stats.dropped)){
                ret.push(item);
            }
        });
        return ret;
    }
});
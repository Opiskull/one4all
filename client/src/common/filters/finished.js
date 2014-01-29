/**
 * Created by Christian on 28.01.14.
 */
angular.module('14all').filter('isFinished',function(){
    return function(input,enabled){
        if(!enabled){
            return input;
        }
        var ret = [];
        angular.forEach(input,function(item){
            if(angular.isUndefined(item.finished) || !item.finished){
                ret.push(item);
            }
        });
        return ret;
    }
});

/**
 * Created by Christian on 28.01.14.
 */
angular.module('14all').filter('multi',['$filter',function($filter){

    function buildOptions(settings){
        var options = {
        };
        angular.forEach(settings.stats,function(enabled,statKey){
            if(enabled){
                if(!options.stats){
                    options.stats = {};
                }
                options.stats[statKey] = !!false;
            }
        });

        options.keyword = settings.keyword;

        if(settings.orderBy){
            options.orderBy = {};
            if(settings.orderBy.predicate){
                options.orderBy.predicate = settings.orderBy.predicate;
            }
            options.orderBy.reverse = !!settings.orderBy.reverse;
        }

        return options;
    }

    function matchStats(options){
        return function(item){
            if(!item.stats){
                return true;
            }
            var result = true;
            angular.forEach(options.stats,function(stat,statKey){
                if(item.stats[statKey]){
                    result = !item.stats[statKey];
                }
            });
            return result;
        }
    }

    return function(input,settings){
        var retItems = [];
        var options = buildOptions(settings);

        retItems = $filter('filter')(input,options.keyword);

        if(options.stats)
            retItems = $filter('filter')(retItems,matchStats(options));

        if(options.orderBy)
            retItems = $filter('orderBy')(retItems, options.orderBy.predicate, options.orderBy.reverse);

        return retItems;
    };
}]);

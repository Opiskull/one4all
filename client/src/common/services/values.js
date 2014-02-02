angular.module('14all').factory('valuesService',[function(){

    function finished(item){
        item.finished = !item.finished;
        return update(item);
    }

    function update(item){
        return item.put().then(function(updated){
            item.updatedAt = updated.updatedAt;
            return item;
        });
    }

    function increase(value){
        value +=1;
        return value;
    }

    function decrease(value){
        if(value <= 0){
            value = 0;
        }
        else{
            value -=1;
        }
        return value;
    }

    function increaseEp(item){
        var episode = item.episode;
        item.episode = increase(item.episode);
        if(episode !== item.episode){
            return update(item);
        }
    }

    function decreaseEp(item){
        var episode = item.episode;
        item.episode = decrease(item.episode);
        if(episode !== item.episode){
            return update(item);
        }
    }

    function increaseCh(item){
        var chapter = item.chapter;
        item.chapter = increase(item.chapter);
        if(chapter !== item.chapter){
            return update(item);
        }
    }

    function decreaseCh(item){
        var chapter = item.chapter;
        item.chapter = decrease(item.chapter);
        if(chapter !== item.chapter){
            return update(item);
        }
    }

    function increaseSe(item){
        var season = item.season;
        item.season = increase(item.season);
        if(season !== item.season){
            return update(item);
        }
    }

    function decreaseSe(item){
        var season = item.season;
        item.season = decrease(item.season);
        if(season !== item.season){
            return update(item);
        }
    }

    var service = {
        increase: increase,
        decrease: decrease,
        increaseEp: increaseEp,
        decreaseEp: decreaseEp,
        increaseCh: increaseCh,
        decreaseCh: decreaseCh,
        increaseSe:increaseSe,
        decreaseSe:decreaseSe,
        update: update,
        finished: finished
    };

    return service;
}]);
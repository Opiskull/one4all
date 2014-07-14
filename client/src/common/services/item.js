angular.module('14all').factory('itemService',['dialogService',function(dialogService){
    function removeWithDlg(type,items,item){
        return dialogService.remove(type,item.title).then(function(result){
            if(result){
                item.remove().then(function(){
                    remove(items,item);
                }).catch(function(err){
                    console.log(err);
                });
            }
        });
    }

    function remove(items,item){
        items.splice(items.indexOf(item),1);
    }

    function update(item){
        return item.put().then(function(updated){
            item.updatedAt = updated.updatedAt;
            return item;
        }).catch(function(err){
            console.log(err);
        });
    }

    function validateNumber(value){
        if(angular.isNumber(value)){
            return value;
        } else{
            return 0;
        }
    }

    function increase(value){
        value = validateNumber(value);
        value +=1;
        return value;
    }

    function decrease(value){
        value = validateNumber(value);
        if(value <= 0){
            value = 0;
        }
        else {
            value -=1;
        }
        return value;
    }

    function incProp(item, property){
        var value = item[property];
        item[property] = increase(value);
        if(value !== item[property])
            return update(item);
    }

    function decProp(item, property){
        var value = item[property];
        item[property] = decrease(value);
        if(value !== item[property]){
            return update(item);
        }
    }

    function showInfo(item){
        item.open = !!!item.open;
    }

    function setInfo(item,selectedInfo){
        item.info = selectedInfo;
        if(!item.infos){
            item.infos = [];
        }
        var oldInfo = _.find(item.infos,function(info){
            return info.provider == selectedInfo.provider;
        });
        if(oldInfo){
            item.infos[item.infos.indexOf(oldInfo)] = selectedInfo;
        } else {
            item.infos.push(selectedInfo);
        }
    }

    return {
        increase: increase,
        decrease: decrease,
        update: update,
        remove: remove,
        removeWithDlg: removeWithDlg,
        showInfo: showInfo,
        setInfo: setInfo,
        incProp: incProp,
        decProp: decProp
    };
}]);

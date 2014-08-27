angular.module('one4all').factory('itemService', [function () {
    function remove(items, item) {
        return item.remove().then(function () {
            items.splice(items.indexOf(item), 1);
        });
    }

    function updateItems(items,item) {
        return update(item).then(function(updatedItem){
            var index =_.findIndex(items,function(tempItem){
                return tempItem._id == updatedItem._id;
            });
            items[index] = updatedItem;
            return updatedItem;
        });
    }

    function update(item){
        return item.put().then(function(updatedItem){
            item.updatedAt = updatedItem.updatedAt;
            return updatedItem;
        });
    }

    function validateNumber(value) {
        if (angular.isNumber(value)) {
            return value;
        } else {
            return 0;
        }
    }

    function increase(value) {
        value = validateNumber(value);
        value += 1;
        return value;
    }

    function decrease(value) {
        value = validateNumber(value);
        if (value <= 0) {
            value = 0;
        }
        else {
            value -= 1;
        }
        return value;
    }

    function incProp(item, property) {
        var value = item[property];
        item[property] = increase(value);
        if (value !== item[property])
            return update(item);
    }

    function decProp(item, property) {
        var value = item[property];
        item[property] = decrease(value);
        if (value !== item[property]) {
            return update(item);
        }
    }

    function showInfo(item) {
        item.open = !item.open;
    }

    function setInfo(item, selectedInfo) {
        item.info = selectedInfo;
        if (!item.infos) {
            item.infos = [];
        }
        var oldInfo = _.find(item.infos, function (info) {
            return info.provider == selectedInfo.provider;
        });
        if (oldInfo) {
            item.infos[item.infos.indexOf(oldInfo)] = selectedInfo;
        } else {
            item.infos.push(selectedInfo);
        }
    }

    return {
        increase: increase,
        decrease: decrease,
        update: update,
        updateItems: updateItems,
        remove: remove,
        showInfo: showInfo,
        setInfo: setInfo,
        incProp: incProp,
        decProp: decProp
    };
}]);

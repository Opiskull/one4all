angular.module('one4all').factory('itemService', ["logger",function (logger) {

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
        showInfo: showInfo,
        setInfo: setInfo
    };
}]);

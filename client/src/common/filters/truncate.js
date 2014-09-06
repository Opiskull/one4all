angular.module('one4all').filter('truncate', function () {
    return function (text, length, end, open) {
        if (!open) {
            if (text) {
                if(end === undefined)
                    end = '';
                if (text.length >= length) {
                    return text.substring(0, length - end.length) + end;
                }
                return text;
            } else {
                return '';
            }
        }
        return text;
    };
});
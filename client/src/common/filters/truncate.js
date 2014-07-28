angular.module('14all').filter('truncate', function () {
    return function (text, length, end, open) {
        if (!open) {
            if (text) {
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
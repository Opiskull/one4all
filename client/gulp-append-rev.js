var cheerio = require('cheerio');
var map = require('event-stream').map;
var Buffer = require('buffer').Buffer;

var appendRev = function appendRev() {
    var appendString = "?rev=" + Date.now();

    function transform(filename) {
        return filename + appendString;
    }

    function transformAttribute(item, attr) {
        var value = item.attr(attr);
        if (value && value !== '' && (value.indexOf('.js') !== -1 || value.indexOf('.css') !== -1))
            item.attr(attr, transform(value));
    }

    return map(function (file, cb) {
        var $ = cheerio.load(file.contents);

        $('link, script').each(function () {
            var item = $(this);
            transformAttribute(item, 'href');
            transformAttribute(item, 'src');
        });

        file.contents = new Buffer($.html());
        cb(null, file)
    });
};

module.exports = appendRev;

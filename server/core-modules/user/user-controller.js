var mongoose = require('mongoose'), lodash = require('lodash');
var User = mongoose.model('User');

function usedTags(req, res) {
    var tags = req.user.usedTags;
    var query = req.params.q;
    if (query) {
        tags = lodash.filter(tags, function (item) {
            if (!item.text) return false;
            return item.text.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
    }
    res.json(tags);
}

module.exports.usedTags = usedTags;
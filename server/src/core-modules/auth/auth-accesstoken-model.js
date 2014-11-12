var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var accessTokenSchema = mongoose.Schema({
    lastLogin: {type: Date, default: Date.now},
    token: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

accessTokenSchema.statics.findUserByToken = function (token, callback) {
    var User = mongoose.model('User');
    this.findOne({token: token})
        .exec(function (err, userToken) {
            if (err) {
                return callback(err);
            }
            if (!userToken) {
                return callback(null);
            }
            return User.findOne({_id: userToken.user}, callback);
        });
};

accessTokenSchema.statics.findByToken = function (token, callback) {
    this.findOne({token: token}, callback);
};

accessTokenSchema.statics.removeWithToken = function (token, callback) {
    this.findByToken(token, function (err, accessToken) {
        accessToken.remove(function (err) {
            callback(err);
        });
    });
};

var AccessToken = mongoose.model('AccessToken', accessTokenSchema);

exports.schema = accessTokenSchema;
exports.model = AccessToken;

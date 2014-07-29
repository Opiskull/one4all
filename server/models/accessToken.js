var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var accessTokenSchema = mongoose.Schema({
    lastLogin: {type: Date, default: Date.now},
    accessToken: String,
    refreshToken: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


accessTokenSchema.statics.findUserByToken = function (token, callback) {
    var User = mongoose.model('User');
    this.findOne({ accessToken: token })
        .exec(function (err, accessToken) {
            if (err) {
                return callback(err);
            }
            if (!accessToken) {
                return callback(null);
            }
            return User.findOne({_id: accessToken.user}, callback);
        });
};

accessTokenSchema.statics.findByToken = function (token, callback) {
    this.findOne({ accessToken: token}, function (err, accessToken) {
        if (err) return callback(err);
        if (!accessToken) return callback(null);
        return callback(null, accessToken);
    });
};

accessTokenSchema.statics.removeWithToken = function (token, callback) {
    this.findByToken(token, function (err, accessToken) {
        accessToken.remove(function (err) {
            callback(err);
        });
    });
};

var AccessToken = mongoose.model('AccessToken', accessTokenSchema);


//var item = new AccessToken();
//item.accessToken = "ya29.1.AADtN_UIT16NE4W0qlOnNq6DkN-GkDj5kWIlsK9sNUeq7ML3iHIYWB4DRHqsXc0";
//item.user = new mongoose.Types.ObjectId('53b5ae3f427f220cfcef34fe');
//item.save(function(err,doc){
//
//});

exports.schema = accessTokenSchema;
exports.model = AccessToken;

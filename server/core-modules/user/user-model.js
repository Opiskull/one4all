var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    profile: {
        provider: String,
        id: String,
        displayName: String,
        name: {
            familyName: String,
            givenName: String,
            middleName: String
        },
        emails: [
            {
                value: String, type: {type: String}
            }
        ]
    },
    roles: [String]
});

userSchema.statics.findOrCreate = function (profile, callback) {
    this.findOne({'profile.id': profile.id}, function (err, user) {
        if (err) {
            return callback(err, null);
        }
        if (user) {
            return callback(null, user);
        }
        else {
            var newuser = new User();
            newuser.username = profile.username;
            newuser.email = profile.email;
            newuser.profile = profile;
            newuser.save(function (err) {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, newuser);
            });
        }
    });
};

userSchema.statics.findByAccessToken = function (token, callback) {
    this.findOne({accessToken: token}).exec(callback);
};

userSchema.plugin(timestamps);
var User = mongoose.model('User', userSchema);

exports.schema = userSchema;
exports.model = User;


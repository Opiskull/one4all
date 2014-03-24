/*
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    accessToken: String,
    refreshToken: String,
    profile: {
        provider: String,
        id: String,
        displayName: String,
        name: {
            familyName : String,
            givenName: String,
            middleName: String
        },
        emails: [{
            value: String, type: {type: String}
        }]
    },
    roles:[String]
});

userSchema.statics.findOrCreate = function(profile,callback){
    this.findOne({'profile.id':profile.id},function(err,user){
        if(err){
            return callback(err,null);
        }
        if(user){
            return callback(null,user);
        }
        else{
            var newuser = new User();
            newuser.username = profile.username;
            newuser.email = profile.email;
            newuser.profile = profile;
            newuser.save(function(err){
                if(err){
                    return callback(err,null);
                }
                return callback(null,newuser);
            });
        }
    });
};

userSchema.statics.findByAccessToken = function(token,callback){
    this.findOne({ accessToken: token }, function (err, user) {
        if (err) { return callback(err); }
        if (!user) { return callback(null); }
        return callback(null, user);
    });
};

userSchema.plugin(timestamps);
var User = mongoose.model('User', userSchema);

*/

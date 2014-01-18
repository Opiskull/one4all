var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    accessToken: String,
    refreshToken: String,
    googleProfile: {
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
    }
});

userSchema.statics.findOrCreate = function(profile,callback){
    this.findOne({'googleProfile.id':profile.id},function(err,user){
        if(err){
            return callback(err,null);
        }
        if(user){
            return callback(null,user);
        }
        else{
            var newuser = new User();
            newuser.username = profile.displayName;
            newuser.googleProfile = profile;
            newuser.email = profile.emails[0].value;
            newuser.save();
            return callback(null,newuser);
        }
    });
};

userSchema.plugin(timestamps);
var User = mongoose.model('User', userSchema);


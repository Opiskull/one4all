var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var helper = require('./helper.js');

var malAnimeSchema = mongoose.Schema({
    id:Number,
    title:String,
    english:String,
    synonyms:[String],
    episodes:Number,
    score:Number,
    status: String,
    start_date:Date,
    end_date:Date,
    synopsis:String,
    image:String
});

malAnimeSchema.statics.findOrCreate = function(inputAnime,callback){
    this.findOne({'id':inputAnime.id},function(err,anime){
        if(err){
            return callback(err,null);
        }
        if(anime){
            return callback(null,anime);
        }
        else{
            helper.parseMalObject(inputAnime,malAnime,callback);
        }
    });
};

malAnimeSchema.plugin(timestamps);
var malAnime = mongoose.model('cache_mal_anime', malAnimeSchema);
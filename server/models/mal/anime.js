var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var helper = require('./helper.js');

//var malAnimeSchema = mongoose.Schema({
//    id:Number,
//    title:String,
//    english:String,
//    synonyms:[String],
//    episodes:Number,
//    score:Number,
//    status: String,
//    start_date:Date,
//    end_date:Date,
//    synopsis:String,
//    image:String
//});

function parseAnime(input,callback){
    var anime = new malAnime();
    anime.id = input.id;
    anime.title = input.title;
    anime.titles = helper.parseTitles(input.synonyms);
    anime.episodes = input.episodes;
    anime.status = input.status;
    anime.start_date = helper.parseDate(input.start_date);
    anime.end_date = helper.parseDate(input.end_date);
    anime.description = input.synopsis;
    anime.img = input.image;
    anime.save(callback);
}

var malAnimeSchema = mongoose.Schema({
    id:Number,
    title:String,
    titles:[{title:String, lang:String}],
    episodes:Number,
    status: String,
    start_date:Date,
    end_date:Date,
    description:String,
    img:String
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
            parseAnime(inputAnime,callback);
        }
    });
};

malAnimeSchema.plugin(timestamps);
var malAnime = mongoose.model('InfoMalAnime', malAnimeSchema);
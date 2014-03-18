var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var helper = require('./helper.js');

//var tmdbMovieSchema = mongoose.Schema({
//    adult:Boolean,
//    id:Number,
//    original_title:String,
//    release_date:Date,
//    poster_path:String,
//    popularity:Number,
//    title:String,
//    vote_average:Number,
//    vote_count:Number
//});

var tmdbMovieSchema = mongoose.Schema({
    id:Number,
    title:String,
    titles:[{title:String,lang:String}],
    release_date:Date,
    img:String,
    adult:Boolean
});

tmdbMovieSchema.statics.findOrCreate = function(inputMovie,callback){
    this.findOne({'id':inputMovie.id},function(err,movie){
        if(err){
            return callback(err,null);
        }
        if(movie){
            return callback(null,movie);
        }
        else{
            helper.parseTmdbObject(inputMovie,tmdbMovie,callback);
        }
    });
};

tmdbMovieSchema.plugin(timestamps);
var tmdbMovie = mongoose.model('cache_tmdb_movie', tmdbMovieSchema);
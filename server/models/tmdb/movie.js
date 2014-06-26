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
    adult:Boolean,
    description: String,
    status: String
});

function parseMovie(output,input,callback){
    output.adult = input.adult;
    output.id = input.id;
    output.title = input.title;
    output.release_date = helper.parseDate(input.release_date);
    output.img = input.poster_path;
    output.description = input.overview;
    output.status = input.status;
}

tmdbMovieSchema.statics.findOrCreate = function(inputMovie,callback){
    this.findOne({'id':inputMovie.id},function(err,movie){
        if(err){
            return callback(err,null);
        }
        if(movie){
            return callback(null,movie);
        }
        else{
            var movie = new tmdbMovie();
            parseMovie(movie,inputMovie, callback);
            movie.save(callback);
        }
    });
};

tmdbMovieSchema.plugin(timestamps);
var tmdbMovie = mongoose.model('InfoTmdbMovie', tmdbMovieSchema);
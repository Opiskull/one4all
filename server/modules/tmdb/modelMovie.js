var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var helper = require('./helper.js');

var tmdbMovieSchema = mongoose.Schema({
    id:Number,
    title:String,
    titles:[{title:String,lang:String}],
    release_date:Date,
    img:String,
    adult:Boolean,
    description: String,
    status: String,
    imdb_id: String
});

function parseMovie(output,input,callback){
    output.adult = input.adult;
    output.id = input.id;
    output.title = input.title;
    output.release_date = helper.parseDate(input.release_date);
    output.img = input.poster_path;
    output.description = input.overview;
    output.status = input.status;
    output.imdb_id = input.imdb_id;
    output.titles = helper.parseTitles(input.alternative_titles)
}

tmdbMovieSchema.statics.findOrCreate = function(inputMovie,callback){
    this.findOne({'id':inputMovie.id},function(err,movie){
        if(err){
            return callback(err,null);
        }
        if(!movie) {
            movie = new tmdbMovie();
        }
        parseMovie(movie,inputMovie,callback);
        return movie.save(callback);
    });
};

tmdbMovieSchema.plugin(timestamps);
var tmdbMovie = mongoose.model('InfoTmdbMovie', tmdbMovieSchema);
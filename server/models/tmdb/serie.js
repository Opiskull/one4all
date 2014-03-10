var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var helper = require('./helper.js');

var tmdbSerieSchema = mongoose.Schema({
    id:Number,
    original_name:String,
    first_air_date:Date,
    poster_path:String,
    popularity:Number,
    name:String,
    vote_average:Number,
    vote_count:Number
});

tmdbSerieSchema.statics.findOrCreate = function(inputSerie,callback){
    this.findOne({'id':inputSerie.id},function(err,serie){
        if(err){
            return callback(err,null);
        }
        if(serie){
            return callback(null,serie);
        }
        else{
            helper.parseTmdbObject(inputSerie,tmdbSerie,callback);
        }
    });
};

tmdbSerieSchema.plugin(timestamps);
var tmdbSerie = mongoose.model('cache_tmdb_serie', tmdbSerieSchema);
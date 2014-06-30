var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var helper = require('./helper.js');

var tmdbSerieSchema = mongoose.Schema({
    id:Number,
    title:String,
    titles:[{title:String,lang:String}],
    first_air_date:Date,
    seasons:Number,
    episodes:Number,
    status:String,
    img:String,
    description: String
});

function parseSerie(output,input,callback){
    output.id = input.id;
    output.title = input.name;
    output.first_air_date = helper.parseDate(input.first_air_date);
    output.img = input.poster_path;
    output.seasons = input.number_of_seasons;
    output.episodes = input.number_of_episodes;
    output.status = input.status;
    output.description = input.overview;
}

tmdbSerieSchema.statics.findOrCreate = function(inputSerie,callback){
    this.findOne({'id':inputSerie.id},function(err,serie){
        if(err){
            return callback(err,null);
        }
        if(!serie){
            serie = new tmdbSerie();
        }
        parseSerie(serie,inputSerie,callback);
        return callback(null,serie);
    });
};

tmdbSerieSchema.plugin(timestamps);
var tmdbSerie = mongoose.model('InfoTmdbSerie', tmdbSerieSchema);
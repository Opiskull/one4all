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
    img:String
});

function parseSerie(input,callback){
    var serie = new tmdbSerie();
    //movie.id = input.id;
    serie.id = input.id;
    serie.title = input.name;
    //serie.titles.push(input.original_name);
    serie.first_air_date = helper.parseDate(input.first_air_date);
    serie.img = input.poster_path;
    serie.save(callback);
}

tmdbSerieSchema.statics.findOrCreate = function(inputSerie,callback){
    this.findOne({'id':inputSerie.id},function(err,serie){
        if(err){
            return callback(err,null);
        }
        if(serie){
            return callback(null,serie);
        }
        else{
            parseSerie(inputSerie,callback);

            //helper.parseTmdbObject(inputSerie,tmdbSerie,callback);
        }
    });
};

tmdbSerieSchema.plugin(timestamps);
var tmdbSerie = mongoose.model('InfoTmdbSerie', tmdbSerieSchema);
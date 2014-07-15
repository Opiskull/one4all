var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var parser = require('./parser.js');

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

tmdbSerieSchema.statics.findOrCreate = function(inputSerie,callback){
    this.findOne({'id':inputSerie.id},function(err,serie){
        if(err){
            return callback(err,null);
        }
        if(!serie){
            serie = new tmdbSerie();
        }
        parser.parseSerie(serie,inputSerie);
        return serie.save(callback);
    });
};

tmdbSerieSchema.statics.findWithId = function(id,callback){
    return this.findOne({'id':id},callback);
};

tmdbSerieSchema.plugin(timestamps);
var tmdbSerie = mongoose.model('InfoTmdbSerie', tmdbSerieSchema);
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var helper = require('./helper.js');

var malMangaSchema = mongoose.Schema({
    id:Number,
    title:String,
    english:String,
    synonyms:[String],
    chapters:Number,
    volumes:Number,
    score:Number,
    status: String,
    start_date:Date,
    end_date:Date,
    synopsis:String,
    image:String
});

malMangaSchema.statics.findOrCreate = function(inputManga,callback){
    this.findOne({'id':inputManga.id},function(err,manga){
        if(err){
            return callback(err,null);
        }
        if(manga){
            return callback(null,manga);
        }
        else{
            helper.parseMalObject(inputManga,malManga,callback);
        }
    });
};

malMangaSchema.plugin(timestamps);
var malManga = mongoose.model('cache_mal_manga', malMangaSchema);
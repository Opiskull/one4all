var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var helper = require('./helper.js');

//var malMangaSchema = mongoose.Schema({
//    id:Number,
//    title:String,
//    english:String,
//    synonyms:[String],
//    chapters:Number,
//    volumes:Number,
//    score:Number,
//    status: String,
//    start_date:Date,
//    end_date:Date,
//    synopsis:String,
//    image:String
//});

var malMangaSchema = mongoose.Schema({
    id:Number,
    title:String,
    titles:[{title:String,lang:String}],
    chapters:Number,
    volumes:Number,
    status: String,
    start_date:Date,
    end_date:Date,
    description:String,
    img:String
});

function parseManga(input,callback){
    var manga = new malManga();
    manga.id = input.id;
    manga.title = input.title;
    manga.titles = helper.parseTitles(input.synonyms);
    manga.chapters = input.chapters;
    manga.volumes = input.volumes;
    manga.status = input.status;
    manga.start_date = helper.parseDate(input.start_date);
    manga.end_date = helper.parseDate(input.end_date);
    manga.description = input.synopsis;
    manga.img = input.image;
    manga.save(callback);
}

malMangaSchema.statics.findOrCreate = function(inputManga,callback){
    this.findOne({'id':inputManga.id},function(err,manga){
        if(err){
            return callback(err,null);
        }
        if(manga){
            return callback(null,manga);
        }
        else{
            parseManga(inputManga,callback);
        }
    });
};

malMangaSchema.plugin(timestamps);
var malManga = mongoose.model('InfoMalManga', malMangaSchema);
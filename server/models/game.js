var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');


var gameSchema = mongoose.Schema({
    title: String,
    finished: Boolean,
    dropped: Boolean,
    titles: [
        {
            title: String,
            lang: String
        }
    ],
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}
});

gameSchema.plugin(timestamps);
mongoose.model('Game', gameSchema);
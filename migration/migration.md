# Migration Document

## MongoDB

### Rename item.stats to state
```
db.animes.update({"stats.dropped":true},{$set:{state:"dropped"},$unset:{stats : 1}},false,true);
db.animes.update({"stats.finished":true},{$set:{state:"finished"},$unset:{stats : 1}},false,true);
db.animes.update({"stats.paused":true},{$set:{state:"paused"},$unset:{stats : 1}},false,true);
db.animes.update({"stats":{$exists:true}},{$set:{state:""},$unset:{stats:1}},false,true);

db.books.update({"stats.dropped":true},{$set:{state:"dropped"},$unset:{stats : 1}},false,true);
db.books.update({"stats.finished":true},{$set:{state:"finished"},$unset:{stats : 1}},false,true);
db.books.update({"stats.paused":true},{$set:{state:"paused"},$unset:{stats : 1}},false,true);
db.books.update({"stats":{$exists:true}},{$set:{state:""},$unset:{stats:1}},false,true);

db.games.update({"stats.dropped":true},{$set:{state:"dropped"},$unset:{stats : 1}},false,true);
db.games.update({"stats.finished":true},{$set:{state:"finished"},$unset:{stats : 1}},false,true);
db.games.update({"stats.paused":true},{$set:{state:"paused"},$unset:{stats : 1}},false,true);
db.games.update({"stats":{$exists:true}},{$set:{state:""},$unset:{stats:1}},false,true);

db.mangas.update({"stats.dropped":true},{$set:{state:"dropped"},$unset:{stats : 1}},false,true);
db.mangas.update({"stats.finished":true},{$set:{state:"finished"},$unset:{stats : 1}},false,true);
db.mangas.update({"stats.paused":true},{$set:{state:"paused"},$unset:{stats : 1}},false,true);
db.mangas.update({"stats":{$exists:true}},{$set:{state:""},$unset:{stats:1}},false,true);

db.movies.update({"stats.dropped":true},{$set:{state:"dropped"},$unset:{stats : 1}},false,true);
db.movies.update({"stats.finished":true},{$set:{state:"finished"},$unset:{stats : 1}},false,true);
db.movies.update({"stats.paused":true},{$set:{state:"paused"},$unset:{stats : 1}},false,true);
db.movies.update({"stats":{$exists:true}},{$set:{state:""},$unset:{stats:1}},false,true);

db.series.update({"stats.dropped":true},{$set:{state:"dropped"},$unset:{stats : 1}},false,true);
db.series.update({"stats.finished":true},{$set:{state:"finished"},$unset:{stats : 1}},false,true);
db.series.update({"stats.paused":true},{$set:{state:"paused"},$unset:{stats : 1}},false,true);
db.series.update({"stats":{$exists:true}},{$set:{state:""},$unset:{stats:1}},false,true);
```

### Remove unused accessToken field in users
```
db.users.update({"accessToken":{$exists:1}},{$unset:{accessToken:1}},false,true);
```

### Remove unused refreshToken field from AccessTokens
```
db.accesstokens.update({"refreshToken" : {$exists: 1}}, {$unset:{"refreshToken":1}},false,true);
```

### LowerCase Tagging and Count Tags
```

// tags to lowercase

function collectionTagsToLowercase(coll){
    coll.find({'tags.1':{$exists:true}}).forEach(function(item){
            for(var i = 0; i< item.tags.length; i++){
                item.tags[i].text = item.tags[i].text.toLowerCase();
            }
            coll.save(item);
        });
}
collectionTagsToLowercase(db.animes);
collectionTagsToLowercase(db.books);
collectionTagsToLowercase(db.games);
collectionTagsToLowercase(db.mangas);
collectionTagsToLowercase(db.movies);
collectionTagsToLowercase(db.series);

//get all tags
var tags = [];
function addItemToTags(item){
    for(var i = 0; i< item.tags.length; i++){
        tags.push({user:item.user,text:item.tags[i].text});
    }
}
db.animes.find({'tags.1':{$exists:true}}).forEach(addItemToTags);
db.books.find({'tags.1':{$exists:true}}).forEach(addItemToTags);
db.games.find({'tags.1':{$exists:true}}).forEach(addItemToTags);
db.mangas.find({'tags.1':{$exists:true}}).forEach(addItemToTags);
db.movies.find({'tags.1':{$exists:true}}).forEach(addItemToTags);
db.series.find({'tags.1':{$exists:true}}).forEach(addItemToTags);

var users = _.map(_.uniq(tags, function(item){
    return JSON.stringify(item.user);
}), function(item){return {'user':item.user,'usedTags':[]}});

_.each(tags, function(item){
    var user = _.find(users,function(usr){return JSON.stringify(usr.user) === JSON.stringify(item.user)});
    var tag = item.text;
    var usedTag = _.find(user.usedTags,{'text': tag});
    if(!usedTag){
        usedTag = {'text': tag, 'count': 0};
        user.usedTags.push(usedTag);
        usedTag = _.find(user.usedTags,{'text':tag});
    }
    if(!usedTag.count){
        usedTag.count = 0;
    }
    usedTag.count +=1;
});

_.each(users, function(item){
    var dbuser = db.users.findOne({_id:item.user});
    if(dbuser){
        dbuser.usedTags = item.usedTags;
        db.users.save(dbuser);
    }
});
```
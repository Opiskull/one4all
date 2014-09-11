# MongoDB Version update commands

## v1.3.0 to v1.4.0

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

db.mangas.update({"stats.dropped":true},{$set:{state:"dropped"},$unset:{stats : 1}},false,true);
db.mangas.update({"stats.finished":true},{$set:{state:"finished"},$unset:{stats : 1}},false,true);
db.mangas.update({"stats.paused":true},{$set:{state:"paused"},$unset:{stats : 1}},false,true);
db.mangas.update({"stats":{$exists:true}},{$set:{state:""},$unset:{stats:1}},false,true);

db.movies.update({"stats.dropped":true},{$set:{state:"dropped"},$unset:{stats : 1}},false,true);
db.movies.update({"stats.finished":true},{$set:{state:"finished"},$unset:{stats : 1}},false,true);
db.movies.update({"stats.paused":true},{$set:{state:"paused"},$unset:{stats : 1}},false,true);
db.movies.update({"stats":{$exists:true}},{$set:{state:""},$unset:{stats:1}},false,true);

db.movies.update({"stats.dropped":true},{$set:{state:"dropped"},$unset:{stats : 1}},false,true);
db.movies.update({"stats.finished":true},{$set:{state:"finished"},$unset:{stats : 1}},false,true);
db.movies.update({"stats.paused":true},{$set:{state:"paused"},$unset:{stats : 1}},false,true);
db.movies.update({"stats":{$exists:true}},{$set:{state:""},$unset:{stats:1}},false,true);
```

### Remove unused accessToken field in users
db.users.update({"accessToken":{$exists:1}},{$unset:{accessToken:1}},false,true);

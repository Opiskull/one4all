var Anime = ModelHelper.get('Anime');
var Book = ModelHelper.get('Book');
var AccessToken = ModelHelper.get('AccessToken');
var Game = ModelHelper.get('Game');

describe('clear All', function () {
    it("clear Animes", function (done) {
        Anime.collection.drop(function (err) {
            // ignore error
            done();
        });
    });
    it("clear Books", function (done) {
        Book.collection.drop(function (err) {
            // ignore error
            done();
        });
    });
    it("clear Games", function (done) {
        Game.collection.drop(function (err) {
            // ignore error
            done();
        });
    });
    it("clear AccessTokens", function (done) {
        AccessToken.collection.drop(function (err) {
            // ignore error
            done();
        });
    });
});
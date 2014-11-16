var Anime = ModelHelper.get('Anime');
var AccessToken = ModelHelper.get('AccessToken');

describe('clear All', function () {
    it("clear Animes", function (done) {
        Anime.collection.drop(function (err) {
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
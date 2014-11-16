var Anime = ModelHelper.get('Anime');
var AccessToken = ModelHelper.get('AccessToken');

describe('clean All', function () {
    it("clean Animes", function (done) {
        Anime.collection.drop(function (err) {
            // ignore error
            done();
        });
    });
    it("clean AccessTokens", function (done) {
        AccessToken.collection.drop(function (err) {
            // ignore error
            done();
        });
    });
});
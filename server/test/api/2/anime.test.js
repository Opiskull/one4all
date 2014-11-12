var helper = require('../../helper.js');
var Anime = helper.getModel('Anime');

describe('api', function () {
    describe('anime', function () {
        before("setGlobalToken", function (done) {
            helper.setGlobalUser(done);
        });

        it('create Anime', function (done) {
            helper.POSTRequest("api/anime", TestData.TestAnime)
                .end(function (e, res) {
                    expect(e).to.equal(null);
                    expect(res.body).to.have.property('id');
                    done()
                });
        });
    });
});
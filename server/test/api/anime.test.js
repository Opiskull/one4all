var Anime = ModelHelper.get('Anime');

describe('api', function () {
    describe('anime', function () {
        before("setGlobalToken", function (done) {
            AuthHelper.setGlobalUser(done);
        });
        it('create Anime', function (done) {
            RequestHelper.post("api/anime", TestDataHelper.Anime)
                .end(function (e, res) {
                    expect(e).to.equal(null);
                    expect(res.body).to.have.property('id');
                    done()
                });
        });
        it('getAll Anime', function (done) {
            RequestModelHelper.getRequestAndModelItems("api/anime", "Anime", function (err, result) {
                expect(result.requestItems).to.have.length(result.modelItems.length);
                done();
            });
        });
        it('update Anime', function (done) {
            ModelHelper.getRandomItem("Anime", function (err, item) {
                item.id = item._id;
                item.rating = 5;
                RequestHelper.updateItem("api/anime", item, function (err, result) {
                    expect(err).to.equal(null);
                    expect(result.rating).to.be.equal(5);
                    done();
                });
            });
        });
        it('delete Anime', function (done) {
            RequestModelHelper.getRequestItemsAfterFunction("api/anime", function (result, callback) {
                ModelHelper.getRandomItem("Anime", function (err, item) {
                    RequestHelper.delItem("api/anime", item._id, function (err) {
                        callback();
                    });
                });
            }, function (err, result) {
                expect(result.afterItems).to.have.length(result.beforeItems.length - 1);
                done();
            });
        });
    });
});
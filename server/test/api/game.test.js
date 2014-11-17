var Game = ModelHelper.get('Game');

describe('api', function () {
    describe('game', function () {
        before("setGlobalToken", function (done) {
            AuthHelper.setGlobalUser(done);
        });
        it('create Game', function (done) {
            RequestHelper.post("api/game", TestDataHelper.Game)
                .end(function (e, res) {
                    expect(e).to.equal(null);
                    expect(res.body).to.have.property('id');
                    done()
                });
        });
        it('getAll Game', function (done) {
            RequestModelHelper.getRequestAndModelItems("api/game", "Game", function (err, result) {
                expect(result.requestItems).to.have.length(result.modelItems.length);
                done();
            });
        });
        it('update Game', function (done) {
            ModelHelper.getRandomItem("Game", function (err, item) {
                item.id = item._id;
                item.rating = 5;
                RequestHelper.updateItem("api/game", item, function (err, result) {
                    expect(err).to.equal(null);
                    expect(result.rating).to.be.equal(5);
                    done();
                });
            });
        });
        it('delete Game', function (done) {
            RequestModelHelper.getRequestItemsAfterFunction("api/game", function (result, callback) {
                ModelHelper.getRandomItem("Game", function (err, item) {
                    RequestHelper.delItem("api/game", item._id, function (err) {
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
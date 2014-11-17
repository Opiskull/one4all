var Book = ModelHelper.get('Book');

describe('api', function () {
    describe('book', function () {
        before("setGlobalToken", function (done) {
            AuthHelper.setGlobalUser(done);
        });
        it('create Book', function (done) {
            RequestHelper.post("api/book", TestDataHelper.Book)
                .end(function (e, res) {
                    expect(e).to.equal(null);
                    expect(res.body).to.have.property('id');
                    done()
                });
        });
        it('getAll Book', function (done) {
            RequestModelHelper.getRequestAndModelItems("api/book", "Book", function (err, result) {
                expect(result.requestItems).to.have.length(result.modelItems.length);
                done();
            });
        });
        it('update Book', function (done) {
            ModelHelper.getRandomItem("Book", function (err, item) {
                item.id = item._id;
                item.rating = 5;
                RequestHelper.updateItem("api/book", item, function (err, result) {
                    expect(err).to.equal(null);
                    expect(result.rating).to.be.equal(5);
                    done();
                });
            });
        });
        it('delete Book', function (done) {
            RequestModelHelper.getRequestItemsAfterFunction("api/book", function (result, callback) {
                ModelHelper.getRandomItem("Book", function (err, item) {
                    RequestHelper.delItem("api/book", item._id, function (err) {
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
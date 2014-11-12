var helper = require('../../helper.js');
var accessToken = helper.getModel('AccessToken');

describe('api', function(){
    before("clean AccessTokens", function (done) {
        console.log("clean AccessTokens");
        accessToken.collection.drop(function (err) {
            // ignore error
            done();
        });
    });
    describe('auth', function(){
        before("setGlobalToken", function (done) {
            helper.setGlobalUser(done);
        });

        it('create TestUser',function(done){
            expect(true).to.be.equal(true, "User created!")
            done()
        });

        it('login without token failed', function(done){
            helper.GETRequest("api/auth/info", 'wrongtoken')
                .end(function(e,res){
                    expect(e).to.equal(null);
                    expect(res.body.user).to.be.undefined;
                    done()
                })
        });

        it('user should be TestUser', function(done){
            helper.GETRequest("api/auth/info")
                .end(function(e,res){
                    expect(e).to.equal(null);
                    expect(res.body).to.have.property('user');
                    expect(res.body.user._id).to.have.string(global.userId);
                    done()
                })
        });

        it('user should have admin role', function(done){
            helper.GETRequest("api/auth/info")
                .end(function(err,res){
                    expect(err).to.equal(null);
                    expect(res.body.roles).to.include.members(TestData.TestUser.roles);
                    done()
                });
        });
    });
});
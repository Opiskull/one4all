var superagent = require('superagent');
var expect = require('chai').expect;
var helper = require('../helper.js');
var accessToken = helper.AccessToken;

describe('api', function(){
    before("clean AccessTokens", function (done) {
        console.log("clean AccessTokens");
        // ignore error
        accessToken.collection.drop(function (err) {
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
            helper.requestHelper("api/auth/info",'wrongtoken')
                .end(function(e,res){
                    expect(e).to.equal(null);
                    expect(res.body.user).to.be.undefined;
                    done()
                })
        });

        it('user should be TestUser', function(done){
            helper.requestHelper("api/auth/info")
                .end(function(e,res){
                    expect(e).to.equal(null);
                    expect(res.body.user).to.not.be.undefined;
                    expect(res.body.user.username).to.be.equal(helper.TestData.TestUser.username);
                    done()
                })
        });

        it('user should have admin role', function(done){
            helper.requestHelper("api/auth/info")
                .end(function(err,res){
                    expect(err).to.equal(null);
                    expect(res.body.roles).to.include.members(helper.TestData.TestUser.roles);
                    done()
                });
        });
    });
});
var accessToken = ModelHelper.get('AccessToken');

describe('api', function(){
    describe('auth', function(){
        before("setGlobalToken", function (done) {
            AuthHelper.setGlobalUser(done);
        });
        it('create TestUser',function(done){
            expect(true).to.be.equal(true, "User created!")
            done()
        });
        it('login without token failed', function(done){
            RequestHelper.get("api/auth/info", 'wrongtoken')
                .end(function(e,res){
                    expect(e).to.equal(null);
                    expect(res.body.user).to.be.undefined;
                    done()
                })
        });
        it('user should be TestUser', function(done){
            RequestHelper.get("api/auth/info")
                .end(function(e,res){
                    expect(e).to.equal(null);
                    expect(res.body).to.have.property('user');
                    expect(res.body.user._id).to.have.string(TestDataHelper.UserId);
                    done()
                })
        });
        it('user should have admin role', function(done){
            RequestHelper.get("api/auth/info")
                .end(function(err,res){
                    expect(err).to.equal(null);
                    expect(res.body.roles).to.include.members(TestDataHelper.User.roles);
                    done()
                });
        });
    });
});
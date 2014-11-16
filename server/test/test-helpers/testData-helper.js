var getRandomString = function (length) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    if (!length) {
        length = 10 + Math.floor(Math.random() * 10)
    }
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
};

var user = {
    username: 'TestUser',
    email: 'testuser@peerzone.net',
    profile: {
        provider: 'testprovider',
        id: "1",
        displayName: "Test User"
    },
    roles: ['admin']
};

var token = {
    token: 'testuseraccesstoken',
    user : ''
};

var anime = {
    tags: [],
    title: getRandomString(),
    episode: 123
};

module.exports = {
    User: user,
    Token: token,
    Anime: anime,
    UserToken: '',
    UserId: '',
    getRandomString: getRandomString
};
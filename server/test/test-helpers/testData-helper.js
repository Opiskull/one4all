var getRandomString = function (length) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    if (!length) {
        length = 10 + Math.floor(Math.random() * 10)
    }
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
};

var getRandomNumber = function (count) {
    return Math.round(Math.random() * count);
};

var getRandomState = function () {
    var stats = ["", "finished", "dropped", "paused", "watching"];
    return stats[Math.round(Math.random() * stats.length)];
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
    episode: getRandomNumber(9999),
    rating: getRandomNumber(5),
    state: getRandomState()
};

module.exports = {
    User: user,
    Token: token,
    Anime: anime,
    UserToken: '',
    UserId: '',
    getRandomString: getRandomString
};
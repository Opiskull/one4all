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
    title: "TestAnime",
    episode: 123
};

module.exports = {
    User: user,
    Token: token,
    Anime: anime,
    UserToken: '',
    UserId: ''
};
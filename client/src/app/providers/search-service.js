angular.module('providers')
    .factory('searchService', ['Restangular', 'malAnime', 'malManga', 'tmdbMovie', 'tmdbSerie', 'googleBooks', function (restangular, malAnime, malManga, tmdbMovie, tmdbSerie, googleBooks) {
        var providers = [
            malAnime,
            malManga,
            tmdbMovie,
            tmdbSerie,
            googleBooks
        ];
        return {
            getProvider: function (title) {
                var provider = {};
                angular.forEach(providers, function (item) {
                    if (item.title && item.title === title) {
                        provider = item;
                    }
                });
                return provider;
            },
            getProvidersWithCategory: function (category) {

            },
            getProviders: function () {
                return providers;
            }
        };
    }]);
angular.module('one4all').factory('settingsService', ['$rootScope', '$localStorage', function ($rootScope, $localStorage) {
    var settings = {};

    function loadStoredSettings() {
        var storedSettings = $localStorage.settings;
        if (storedSettings) {
            angular.copy(storedSettings, settings);
        }
    }

    function loadDefaultSettings() {
        var defaultStats = {
            finished: false,
            dropped: false,
            paused: false,
            none: false
        };
        var defaultSettings = {
            filters: {
                stats: defaultStats,
                exclude: true,
                keyword: '',
                tags: []
            },
            orderBy: {
                predicate: 'title',
                reverse: false
            }
        };
        angular.copy(defaultSettings, settings);
    }

    function saveClientSettings() {
        $localStorage.settings = settings;
    }

    function deleteClientSettings() {
        delete $localStorage.settings;
    }

    function resetClientSettings() {
        loadDefaultSettings();
        $rootScope.$emit('filter');
    }

    loadDefaultSettings();
    loadStoredSettings();
    return {
        settings: settings,
        saveClientSettings: saveClientSettings,
        deleteClientSettings: deleteClientSettings,
        resetClientSettings: resetClientSettings
    };
}]);

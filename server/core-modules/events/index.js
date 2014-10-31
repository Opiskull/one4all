var eventManager = require('./event-manager.js');
var moduleLoader = requireLib('modules-loader.js');

module.exports = eventManager;

module.exports.init = function (server, router, path) {
    moduleLoader.loadModulesFromDirectory(path, 'modules', function (module, moduleName) {
        module.init(eventManager);
    });
};
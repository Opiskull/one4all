module.exports = function (dirname) {
    global.__rootdir = dirname;

    global.requireRoot = function (name) {
        return require(__rootdir + '/' + name);
    };

    global.requireCore = function (name) {
        return require(__rootdir + '/core-modules/' + name);
    };

    global.requireLibrary = function (name) {
        return require(__rootdir + '/lib/' + name);
    };

    global.requireLib = requireLibrary;

    global.requireConfig = function (name) {
        function getSamplePath(name) {
            var path = require('path');
            return getConfigPath(
                path.basename(name) + ".sample" + path.extname(name)
            );
        }

        function getConfigPath(name) {
            return __rootdir + '/config/' + name;
        }

        var fs = require('fs'), util = require('util');

        var configPath = getConfigPath(name);
        var samplePath = getSamplePath(name);
        if (fs.existsSync(samplePath)) {
            return util._extend(require(samplePath), require(configPath));
        } else {
            return require(configPath);
        }
    };

    global.requireConf = global.requireConfig;
};
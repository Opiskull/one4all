var router = require('./route-builder.js');
var fs = require('fs');
var pathUtil = require('path');
var config = requireConfig('config.json');
var logger = requireLib('logger.js');

var corePath = pathUtil.join(__rootdir, 'core-modules');
var dataPath = pathUtil.join(__rootdir, 'data-modules');
var externalApiPath = pathUtil.join(__rootdir, 'external-api-modules');

function loadCoreModules(server) {
    server.log.info('loading core modules [%s]', corePath);
    loadModulesFromPath(corePath, function (module, moduleName) {
        var path = pathUtil.join(corePath, moduleName);
        module.init(server, router, path);
    });
}

function loadDataModules(server) {
    server.log.info('loading data modules [%s]', dataPath);
    loadModulesFromPath(dataPath, function (module, moduleName) {
        module.init(server, router);
    });
}

function loadExternalApiModules(server) {
    server.log.info('loading external api modules [%s]', externalApiPath);
    loadModulesFromPath(externalApiPath, function (module, moduleName) {
        module.init(server, router);
    });
}

function loadModule(file, parentName, initModule) {
    var module = require(file);
    var moduleName = getModuleName(file);
    if (module.init) {
        logger.info('module [%s] in [%s] loaded!', moduleName, parentName);
        initModule(module, moduleName);
    } else {
        logger.warn('module [%s] in [%s] has no init!', moduleName, parentName);
    }
}

function isModule(path) {
    return fs.existsSync(path + '/index.js');
}

function getDirectories(path) {
    return fs.readdirSync(path).map(function (file) {
        return pathUtil.join(path, file);
    }).filter(function (file) {
        return fs.statSync(file).isDirectory();
    });
}

function getModuleName(path) {
    return pathUtil.basename(path);
}

function loadModulesFromPath(path, initModule) {
    var moduleName = getModuleName(path);
    getDirectories(path).forEach(function (directory) {
        if (isModule(directory)) {
            loadModule(directory, moduleName, initModule);
        }
    });
}

function loadModulesFromDirectory(parent, directory, initModule) {
    var path = pathUtil.join(parent, directory);
    var parentName = pathUtil.basename(parent);
    logger.info("Load modules in [%s] started", parentName);
    loadModulesFromPath(path, initModule);
    logger.info("Load modules in [%s] ended", parentName);
}

module.exports.loadModulesFromDirectory = loadModulesFromDirectory;
module.exports.loadModulesFromPath = loadModulesFromPath;
module.exports.loadCoreModules = loadCoreModules;
module.exports.loadDataModules = loadDataModules;
module.exports.loadExternalApiModules = loadExternalApiModules;
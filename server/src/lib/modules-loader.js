var router = require('./route-builder.js');
var fs = require('fs');
var pathUtil = require('path');
var config = requireConfig('config.json');
var logger = requireLib('logger.js').child({widget: 'modules'});

function initModuleWithServerAndRouter(server) {
    return function (module, moduleName) {
        module.init(server, router);
    }
}

function createModuleLogInfo(file, moduleName, parentName) {
    return {
        module: {
            file: file,
            moduleName: moduleName,
            parentName: parentName
        }
    };
}

function loadModule(file, parentName, initModule) {
    var module = require(file);
    var moduleName = getModuleName(file);
    var moduleLogInfo = createModuleLogInfo(file, moduleName, parentName);
    if (module.init) {
        logger.info(moduleLogInfo, '[%s] submodule [%s] loaded!', parentName, moduleName);
        initModule(module, moduleName);
    } else {
        logger.warn(moduleLogInfo, '[%s] submodule [%s] not loaded!', parentName, moduleName);
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
    logger.info("[%s] start", moduleName);
    getDirectories(path).forEach(function (directory) {
        if (isModule(directory)) {
            loadModule(directory, moduleName, initModule);
        }
    });
    logger.info("[%s] end", moduleName);
}

function loadModulesFromDirectory(parent, directory, initModule) {
    var path = pathUtil.join(parent, directory);
    loadModulesFromPath(path, initModule);
}

function loadServerModules(server) {
    logger.info("[server-modules] start");
    var corePath = pathUtil.join(__rootdir, 'core-modules');
    var dataPath = pathUtil.join(__rootdir, 'data-modules');
    var externalApiPath = pathUtil.join(__rootdir, 'external-api-modules');
    loadModulesFromPath(corePath, initModuleWithServerAndRouter(server));
    loadModulesFromPath(dataPath, initModuleWithServerAndRouter(server));
    loadModulesFromPath(externalApiPath, initModuleWithServerAndRouter(server));
    logger.info("[server-modules] end");
}

module.exports.loadModulesFromDirectory = loadModulesFromDirectory;
module.exports.loadModulesFromPath = loadModulesFromPath;
module.exports.loadServerModules = loadServerModules;
var router = require('./route-builder.js');
var fs = require('fs');
var pathUtil = require('path');
var config = requireConfig('config.json');

var corePath = pathUtil.join(__rootdir, 'core-modules');
var dataPath = pathUtil.join(__rootdir, 'data-modules');
var externalApiPath = pathUtil.join(__rootdir, 'external-api-modules');

function loadCoreModules(server) {
    server.log.info('loading core modules [%s]', corePath);
    loadModules(server, corePath);
}

function loadDataModules(server) {
    server.log.info('loading data modules [%s]', dataPath);
    loadModules(server, dataPath);
}

function loadExternalApiModules(server) {
    server.log.info('loading external api modules [%s]', externalApiPath);
    loadModules(server, externalApiPath);
}

function loadModule(server, file) {
    var module = require(file);
    var moduleName = getModuleName(file);
    if (module.init) {
        server.log.info('module [%s] loaded!', moduleName);
        module.init(server, router);
    } else {
        server.log.warn('module [%s] loaded without init!', moduleName);
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

function loadModules(server, path) {
    getDirectories(path).forEach(function (directory) {
        if (isModule(directory)) {
            loadModule(server, directory);
        }
        loadModules(server, directory);
    });
}

module.exports.loadCoreModules = loadCoreModules;
module.exports.loadDataModules = loadDataModules;
module.exports.loadExternalApiModules = loadExternalApiModules;
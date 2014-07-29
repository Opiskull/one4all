var router = require('./router.js');
var fs = require('fs');
var pathUtil = require('path');

var excludeExtensions = ['.json'];

function loadController(path, module, file, server) {
    var ctrl = require(path);
    if (ctrl.init) {
        server.log.info('load module:%s file:%s', module, file);
        ctrl.init(server, router);
    } else {
        server.log.info('file:%s from module:%s not loaded', file, module);
    }
}

function loadControllers(controllerpath, server) {
    fs.readdirSync(controllerpath).forEach(function (module) {
        var path = buildPath(controllerpath, module);
        var stats = fs.statSync(path);
        if (stats.isDirectory()) {
            fs.readdirSync(path).forEach(function (moduleFile) {
                var modulePath = buildPath(path, moduleFile);
                loadController(modulePath, module, moduleFile, server)
            });
        } else {
            if (stats.isFile()) {
                if (excludeExtensions.indexOf(pathUtil.extname(module)) == -1) {
                    loadController(path, "controller", module, server);
                }
            }
        }
    });
}

function buildPath(path, file) {
    return path + '/' + file;
}

exports.loadModules = loadModules;
exports.loadControllers = loadControllers;
exports.loadModels = loadModels;

function loadModels(modelpath, server) {
    fs.readdirSync(modelpath).forEach(function (model) {
        server.log.info('load model: ' + model);
        require(buildPath(modelpath, model));
    });
}

function loadModules(modulepath, server) {
    fs.readdirSync(modulepath).forEach(function (module) {
        var path = buildPath(modulepath, module);
        if (excludeExtensions.indexOf(pathUtil.extname(module)) == -1) {
            var ctrl = require(path);
            if (ctrl.init) {
                server.log.info('load module:%s', module);
                ctrl.init(server, router);
            } else {
                server.log.info('module:%s not loaded', module);
            }
        }
    });
}

var router = require('./router.js');
var fs = require('fs');


function loadController(path,module,file,server){
    var ctrl = require(path);
    if(ctrl.init){
        console.log('load module:%s file:%s',module,file);
        ctrl.init(server,router);
    } else{
        console.log('file:%s from module:%s not loaded',file,module);
    }
}

function loadModels(modelpath){
    fs.readdirSync(modelpath).forEach(function(model){
        console.log('load model: ' + model);
        require(buildPath(modelpath,model));
    });
}

function loadControllers(controllerpath,server){
    fs.readdirSync(controllerpath).forEach(function(module){
        var path = buildPath(controllerpath,module);
        var stats = fs.statSync(path);
        if(stats.isDirectory()){
            fs.readdirSync(path).forEach(function(moduleFile){
                var modulePath = buildPath(path,moduleFile);
                loadController(modulePath,module,moduleFile,server)
            });
        } else {
            if(stats.isFile()){
                loadController(path,"controller",module,server);
            }
        }
    });
}

function buildPath(path,file){
    return path + '/' + file;
}

exports.loadControllers = loadControllers;
exports.loadModels = loadModels;
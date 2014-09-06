var cheerio = require('cheerio');
var map = require('event-stream').map;
var Buffer = require('buffer').Buffer;
var pkg = require('./package.json');
var git = require('nodegit');
var path = require('path');


var buildTime = Date.now();

var appendRev = function appendRev() {
    buildTime = Date.now();
    var appendString = "?rev=" + buildTime;

    function transform(filename) {
        return filename + appendString;
    }

    function transformAttribute(item, attr) {
        var value = item.attr(attr);
        if (value && value !== '' && (value.indexOf('.js') !== -1 || value.indexOf('.css') !== -1))
            item.attr(attr, transform(value));
    }

    return map(function (file, cb) {
        var $ = cheerio.load(file.contents);
        $('link, script').each(function () {
            var item = $(this);
            transformAttribute(item, 'href');
            transformAttribute(item, 'src');
        });
        file.contents = new Buffer($.html());
        cb(null, file)
    });
};

function getAppInfo(callback) {
    getLastCommit(function(err,commit){
        if(err) throw err;
        var appInfo = { version: pkg.version, lastCommit: commit.sha(), buildTime: buildTime};
        callback(null,"appInfo = JSON.parse('"+JSON.stringify(appInfo)+"');");
    });
}

function getLastCommit(callback){
    git.Repo.open(path.resolve(__dirname, '../.git'),function(openRepoErr,repo){
        if(openRepoErr) throw openRepoErr;
        git.Reference.oidForName(repo, 'HEAD', function(oidForNameErr, head){
            if(oidForNameErr) throw oidForNameErr;
            repo.getCommit(head, function(getCommitErr, commit){
                if(getCommitErr) throw getCommitErr;
                callback(null,commit);
            });
        })
    });
}

var appendAppInfo = function appendVersion() {
    return map(function (file, cb) {
        var $ = cheerio.load(file.contents);
        getAppInfo(function(err, appInfo){
            $('body').append('<script type="text/javascript">' + appInfo + '</script>');
            file.contents = new Buffer($.html());
            cb(null, file);
        });
    });
};

module.exports.appendAppInfo = appendAppInfo;
module.exports.appendRev = appendRev;

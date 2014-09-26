var bunyan = require('bunyan');
var config = requireConfig('config.json');
var packageInfo = requireRoot('package.json');

module.exports = bunyan.createLogger({
    name: packageInfo.name,
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'info',
            type: 'rotating-file',
            period: '1d',
            path: config.log.file,
            count: 7
        }
    ],
    serializers: bunyan.stdSerializers
});
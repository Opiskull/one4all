var eventEmitter2 = require('eventemitter2').EventEmitter2;

var server = new eventEmitter2({
    wildcard: true,
    newListener: false
});

module.exports = {
    server:server
};

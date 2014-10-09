var eventEmitter2 = require('eventemitter2').EventEmitter2;

var emitter = new eventEmitter2({
    wildcard: true,
    newListener: false
});

module.exports = {
    emitter: emitter,
    on: emitter.on,
    emit: emitter.emit
};

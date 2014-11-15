var serverSrcPath = '../src/';
require(serverSrcPath + 'lib/globals.js')(__dirname + "/" + serverSrcPath);

global.expect = require('chai').expect;
// ModelHelper needs to be run before all others
global.ModelHelper = require('./test-helpers/model-helper.js');
global.AuthHelper = require('./test-helpers/auth-helper.js');
global.TestDataHelper = require('./test-helpers/testData-helper.js');
global.RequestHelper = require('./test-helpers/request-helper.js');
global.RequestModelHelper = require('./test-helpers/request-model-helper.js');




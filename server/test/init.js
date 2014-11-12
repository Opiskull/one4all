require('../src/lib/globals.js')(__dirname + "/../src");
require('../src/core-modules/user/user-model.js');
require('../src/data-modules/anime/anime-model.js');
require('../src/core-modules/auth/auth-accesstoken-model.js');

global.expect = require('chai').expect;
global.helper = require('./helper.js');
global.TestData = require('./test-data.js');
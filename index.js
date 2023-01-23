GrblParser = require('./lib/parser');

constants = require('./lib/constants');
validStrings = require('./test/spec_constants').validStrings;

const parser = new GrblParser();

parser.parseData(validStrings.validError);
parser.parseData(validStrings.validGcodeState);
parser.parseData(validStrings.validSetting);
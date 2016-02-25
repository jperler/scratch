'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _pdfparser = require('pdf2json/pdfparser');

var _pdfparser2 = _interopRequireDefault(_pdfparser);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REGEX_NUMBERS_ONLY = /[^0-9\.]+/g;
var START_INDEX = 9;
var NUM_COLS = 6;
var FREQUENCIES = {
    YEAR: 'yr',
    WEEK: 'wk'
};

function parse(data) {
    return _lodash2.default.chain(data.data.Pages[0].Texts).map(function (text) {
        return unescape(text.R[0].T);
    }).slice(START_INDEX).chunk(NUM_COLS).initial().map(function (chunk) {
        return {
            name: chunk[0],
            numbers: parseGameNumbers(chunk[1]),
            prizes: [{
                total: parseFormattedNumber(chunk[2]),
                remaining: parseFormattedNumber(chunk[3]),
                freq: parseFrequency(chunk[2])
            }, {
                total: parseFormattedNumber(chunk[4]),
                remaining: parseFormattedNumber(chunk[5]),
                freq: null
            }]
        };
    }).value();
}

function parseGameNumbers(data) {
    return _lodash2.default.chain(data).split(',').map(function (n) {
        return parseInt(n, 10);
    }).value();
}

function parseFrequency(data) {
    var prize = data.toLowerCase();
    if (_lodash2.default.contains(prize, FREQUENCIES.YEAR)) return 'YEAR';
    if (_lodash2.default.contains(prize, FREQUENCIES.WEEK)) return 'WEEK';
    return null;
}

function parseFormattedNumber(data) {
    return parseInt(data.replace(REGEX_NUMBERS_ONLY, ''), 10);
}

module.exports = function (inPath) {
    var parser = new _pdfparser2.default();
    var basename = _path2.default.basename(inPath, '.pdf');
    var outPath = 'output/' + basename + '.json';

    parser.on('pdfParser_dataReady', function (data) {
        _fs2.default.writeFile(outPath, JSON.stringify(parse(data)));
    });

    parser.loadPDF(inPath);
};

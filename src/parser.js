import _ from 'lodash'
import PDFParser from 'pdf2json/pdfparser'
import fs from 'fs'
import path from 'path'

const REGEX_NUMBERS_ONLY = /[^0-9\.]+/g
const START_INDEX = 9
const NUM_COLS = 6
const FREQUENCIES = {
    YEAR: 'yr',
    WEEK: 'wk',
}

function parse (data) {
    return _.chain(data.data.Pages[0].Texts)
        .map(text => unescape(text.R[0].T))
        .slice(START_INDEX)
        .chunk(NUM_COLS)
        .initial()
        .map(chunk => ({
            name: chunk[0],
            numbers: parseGameNumbers(chunk[1]),
            prizes: [
                {
                    total: parseFormattedNumber(chunk[2]),
                    remaining: parseFormattedNumber(chunk[3]),
                    freq: parseFrequency(chunk[2]),
                },
                {
                    total: parseFormattedNumber(chunk[4]),
                    remaining: parseFormattedNumber(chunk[5]),
                    freq: null,
                },
            ],
        })).value()
}

function parseGameNumbers (data) {
    return _.chain(data)
        .split(',')
        .map(n => parseInt(n, 10))
        .value()
}

function parseFrequency (data) {
    const prize = data.toLowerCase()
    if (_.contains(prize, FREQUENCIES.YEAR)) return 'YEAR'
    if (_.contains(prize, FREQUENCIES.WEEK)) return 'WEEK'
    return null
}

function parseFormattedNumber (data) {
    return parseInt(data.replace(REGEX_NUMBERS_ONLY, ''), 10)
}

module.exports = function (inPath) {
    const parser = new PDFParser()
    const basename = path.basename(inPath, '.pdf')
    const outPath = `output/${basename}.json`

    parser.on('pdfParser_dataReady', data => {
        fs.writeFile(outPath, JSON.stringify(parse(data)))
    })

    parser.loadPDF(inPath)
}

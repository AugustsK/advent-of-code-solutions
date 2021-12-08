const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const validation = {
    byr: v => parseInt(v, 10) >= 1920 && parseInt(v, 10) <= 2002,
    iyr: v => parseInt(v, 10) >= 2010 && parseInt(v, 10) <= 2020,
    eyr: v => parseInt(v, 10) >= 2010 && parseInt(v, 10) <= 2030,
    hgt: v => {
        const size = parseInt(v.match(/[0-9]+/ig)[0], 10);
        const unit = v.replace(size, '')

        if (unit) {
            if (unit === 'cm') return size >= 150 && size <= 193;
            else if (unit === 'in') return size >= 59 && size <= 76;
        }

        return false;
    },
    hcl: v => /^#[0-9a-z]{6}$/.test(v),
    ecl: v => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].filter(x => x === v).length === 1,
    pid: v => /^[0-9]{9}$/.test(v),
    cid: v => true
}
const passports = getInput().split(/\r?\n\r?\n/).map(line => line.split(/\n|\s/));
let result = 0;

passports.forEach(passport => {
    const fields = passport.map(x => x.split(':')[0]);
    let valid = true;

    if (arrDiff(required, fields).length) valid = false;

    passport.forEach(fieldMap => {
        const [ field, value ] = fieldMap.split(':');

        if (!(field in validation) || !validation[field](value)) valid = false;
    });

    if (valid) result ++;
})

outResult(result);

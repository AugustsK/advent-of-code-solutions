const arrIntersects = (arr1, arr2) => {
    return arr1.filter(x => arr2.includes(x));
}

const arrDiff = (arr1, arr2) => {
    return arr1.filter(x => !arr2.includes(x));
}

const countInstances = (arr, char) => {
    return arr.filter(x => x.includes(char)).length;
}

module.exports = {
    arrIntersects,
    arrDiff,
    countInstances
}

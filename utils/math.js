const gcd = (x, y) => {
    x = Math.abs(x);
    y = Math.abs(y);

    while (y) {
        let t = y;
        y = x % y;
        x = t;
    }

    return x;
}

const lcm = (x, y) => (!x || !y) ? 0 : Math.abs((x * y) / gcd(x, y));

const gauss = num => (num + 1) * num / 2;

module.exports = {
    gcd,
    lcm,
    gauss
};

/**
 * gauss: x = (y + 1) * y / 2
 * reverse-gauss: y / 2 = (y + 1)
 */

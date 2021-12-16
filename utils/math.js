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

const lcm = (x, y) => {
    return (!x || !y) ? 0 : Math.abs((x * y) / gcd(x, y));
}

module.exports = {
    gcd,
    lcm
};

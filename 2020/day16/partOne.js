const Utils = require('../../utils');
const { outDebug } = require('../../utils/output');

const [rawRules, [, rawTicket], [, ...rawNearby]] = Utils.Input.strToEmptyLineGroups(Utils.Input.getInput());
const yourTicket = Utils.Input.lineToIntArr(rawTicket, ',');
const nearbyTickets = rawNearby.map((ticket) => Utils.Input.lineToIntArr(ticket, ','));
const ruleMap = Object.fromEntries(rawRules.map((rule) => rule.split(': ')));
let errorRate = 0;

const validate = (value, type) => {
  if (!(type in ruleMap)) return false;

  const val = parseInt(value, 10);
  const [a, b] = ruleMap[type].split(' or ');
  const [aMin, aMax] = a.split('-').map((x) => parseInt(x, 10));
  const [bMin, bMax] = b.split('-').map((x) => parseInt(x, 10));

  return (val >= aMin && val <= aMax) || (val >= bMin && val <= bMax);
};

nearbyTickets.forEach((ticketValues) => {
  ticketValues.forEach((value) => {
    let valid = Object.keys(ruleMap).some((type) => validate(value, type));
    if (!valid) errorRate += value;
  });
});

Utils.Output.outResult(errorRate);

const Utils = require('../../utils');
const { outDebug } = require('../../utils/output');

const [rawRules, [, rawTicket], [, ...rawNearby]] = Utils.Input.strToEmptyLineGroups(Utils.Input.getInput());
const yourTicket = Utils.Input.lineToIntArr(rawTicket, ',');
const nearbyTickets = rawNearby.map((ticket) => Utils.Input.lineToIntArr(ticket, ','));
const ruleMap = Object.fromEntries(rawRules.map((rule) => rule.split(': ')));
const tmpFieldMap = {};
const fieldMap = {};
let result = 1;

const validate = (value, type) => {
  if (!(type in ruleMap)) return false;

  const val = parseInt(value, 10);
  const [a, b] = ruleMap[type].split(' or ');
  const [aMin, aMax] = a.split('-').map((x) => parseInt(x, 10));
  const [bMin, bMax] = b.split('-').map((x) => parseInt(x, 10));

  return (val >= aMin && val <= aMax) || (val >= bMin && val <= bMax);
};

// Filter valid tickets only
const filteredTickets = nearbyTickets.filter((ticketValues) => {
  return ticketValues.every((value, i) => {
    return Object.keys(ruleMap).some((type) => validate(value, type));
  });
});

// Find possible field types for each field
for (let i = 0; i < yourTicket.length; i++) {
  // Start with all rules
  let matchedRules = Object.keys(ruleMap);

  // Inject own ticket into filtered tickets for a bit increased precision
  [...filteredTickets, yourTicket].forEach((ticketValues) => {
    const curMatch = Object.keys(ruleMap).filter((type) => validate(ticketValues[i], type));

    // Reduce rule selection to only those that matched current field for current ticket
    matchedRules = Utils.Array.intersects(matchedRules, curMatch);
  });

  tmpFieldMap[i] = matchedRules;
}

// single out each field to final mapping - keep going until mapped field types length matches ticket length
while (Object.keys(fieldMap).length < yourTicket.length) {
  for (const [index, types] of Object.entries(tmpFieldMap)) {
    // if field has only one type, mark it on final mapping
    if (types.length === 1) {
      fieldMap[types[0]] = parseInt(index, 10);
      delete tmpFieldMap[index];

      Object.keys(tmpFieldMap).forEach((key) => {
        // remove mapped field from remaining field type possibilities
        tmpFieldMap[key] = Utils.Array.diff(tmpFieldMap[key], types);
      });
    }
  }
}

// calc result using mapped fields
for (const [type, index] of Object.entries(fieldMap)) {
  if (/^departure/.test(type)) result *= yourTicket[index];
}

Utils.Output.outDebug(fieldMap);
Utils.Output.outResult(result);

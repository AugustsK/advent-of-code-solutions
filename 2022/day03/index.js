const Utils = require('../../utils');

const charToPriority = (char) => char.charCodeAt(0) - (char.toUpperCase() === char ? 38 : 96);

const rucksacks = Utils.Input.strToLines(Utils.Input.getInput()).map((rucksackRaw, idx) => {
  const rucksack = {
    compartmentA: rucksackRaw.slice(0, rucksackRaw.length / 2),
    compartmentB: rucksackRaw.slice(rucksackRaw.length / 2),
    full: rucksackRaw,
  };

  rucksack.shared = Utils.Array.intersects(rucksack.compartmentA.split(''), rucksack.compartmentB.split(''));
  rucksack.sharedUnique = new Set(rucksack.shared);
  rucksack.priority = [...rucksack.sharedUnique.values()].reduce(
    (sharedSum, current) => sharedSum + charToPriority(current),
    0,
  );

  return rucksack;
});

const partOne = rucksacks.reduce((sum, rucksack) => sum + rucksack.priority, 0);
let partTwo = 0;

for (let i = 0; i < rucksacks.length; i += 3) {
  const rucksackGroup = rucksacks.slice(i, i + 3).map((rucksack) => rucksack.full.split(''));
  const identifier = Utils.Array.intersects(...rucksackGroup);

  partTwo += charToPriority(identifier[0]);
}

Utils.Output.outResult(partOne);
Utils.Output.outResult(partTwo);

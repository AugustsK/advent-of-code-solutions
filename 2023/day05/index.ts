import type { Coords } from '../../types';

import { InputUtil, OutputUtil, MathUtil, ArrayUtil } from '../../utils';

export enum MapType {
  Soil,
  Fertilizer,
  Water,
  Light,
  Temperature,
  Humidity,
  Location,
}

export type SeedMap = {
  destination: number;
  source: number;
  size: number;
};

const maps: Record<MapType, SeedMap[]> = {
  [MapType.Soil]: [],
  [MapType.Fertilizer]: [],
  [MapType.Water]: [],
  [MapType.Light]: [],
  [MapType.Temperature]: [],
  [MapType.Humidity]: [],
  [MapType.Location]: [],
};

const seeds: number[] = [];

let curTarget: MapType;

InputUtil.strToLines(InputUtil.getInput()).forEach((line) => {
  if (!line.trim()) {
    return;
  }

  if (line.startsWith('seeds:')) {
    seeds.push(
      ...line
        .replace('seeds: ', '')
        .split(' ')
        .map((str) => parseInt(str, 10)),
    );

    return;
  }

  if (line.includes('-to-')) {
    switch (line) {
      case 'seed-to-soil map:':
        curTarget = MapType.Soil;
        break;
      case 'soil-to-fertilizer map:':
        curTarget = MapType.Fertilizer;
        break;
      case 'fertilizer-to-water map:':
        curTarget = MapType.Water;
        break;
      case 'water-to-light map:':
        curTarget = MapType.Light;
        break;
      case 'light-to-temperature map:':
        curTarget = MapType.Temperature;
        break;
      case 'temperature-to-humidity map:':
        curTarget = MapType.Humidity;
        break;
      case 'humidity-to-location map:':
        curTarget = MapType.Location;
        break;
    }

    return;
  }

  if (/\d/.test(line)) {
    const arr = line.split(' ').map((str) => parseInt(str, 10));
    const [destination, source, size] = arr;

    maps[curTarget].push({
      destination,
      source,
      size,
    });
  }
});

const mapped = seeds.map((seed) =>
  Object.values(maps).reduce((resolved, entries) => {
    const match = entries.find(({ source, size }) => source <= resolved && source + size >= resolved);

    if (match) {
      return resolved - match.source + match.destination;
    }

    return resolved;
  }, seed),
);

let partOne = Math.min(...mapped);

const seedRanges: [number, number][] = [];

for (let i = 0; i < seeds.length; i += 2) {
  seedRanges.push([seeds[i], seeds[i + 1]]);
}
let partTwo = seedRanges.reduce((minNum, [start, size], idx) => {
  let min = minNum;

  for (let i = 0; i < size; i++) {
    const seed = start + i;

    const { location, jump } = Object.values(maps).reduce(
      (resolved, entries) => {
        const match = entries.find(
          ({ source, size }) => source <= resolved.location && source + size >= resolved.location,
        );

        if (match) {
          const location = resolved.location - match.source + match.destination;
          const jump = match.destination + match.size - location;

          return {
            location,
            jump: Math.min(jump, resolved.jump),
          };
        }

        return resolved;
      },
      {
        location: seed,
        jump: Infinity,
      },
    );

    i += Math.max(jump - 2, 0);

    if (location < min) {
      min = location;
    }
  }

  return min;
}, Infinity);

OutputUtil.outResult(partOne);
OutputUtil.outResult(partTwo - 1); // pls send help on why its off by 1

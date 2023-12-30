import type { Coords } from '../types';

export const coords2str = (coords: Coords) => `${coords.x}-${coords.y}`;

export const str2coords = (str: string) => {
  const [x, y] = str.split('-').map((num) => parseInt(num, 10));

  return { x, y };
};

import type { Coords } from '../../types';

import { InputUtil, OutputUtil, MathUtil, ArrayUtil } from '../../utils';

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

enum Combinations {
  FiveOfAKind = 'Five of a kind',
  FourOfAKind = 'Four of a kind',
  FullHouse = 'Full house',
  ThreeOfAKind = 'Three of a kind',
  TwoPair = 'Two Pairs',
  OnePair = 'One pair',
  HighCard = 'High card',
}

const determineHandCombination = (hand) => {
  const handCards = hand.split('');
  const uniqueCards = new Map<string, number>(
    handCards.map((card) => {
      const count = handCards.filter((bCard) => bCard === card).length;

      return [card, count];
    }),
  );
  const counts = [...uniqueCards.values()];

  if (uniqueCards.size === 1) return Combinations.FiveOfAKind;

  if (uniqueCards.size === 2) {
    if (counts.some((val) => val === 4)) {
      return Combinations.FourOfAKind;
    }

    return Combinations.FullHouse;
  }

  if (counts.some((count) => count === 3)) return Combinations.ThreeOfAKind;

  const hasPair = counts.some((count) => count === 2);

  if (hasPair && uniqueCards.size === 3) return Combinations.TwoPair;

  if (hasPair) return Combinations.OnePair;

  return Combinations.HighCard;
};

const hands = InputUtil.strToLines(InputUtil.getInput())
  .map((line) => {
    const [hand, bid] = line.split(' ');
    const combination = determineHandCombination(hand);

    return {
      hand,
      bid: parseInt(bid, 10),
      combination,
      rank: Object.values(Combinations).indexOf(combination),
    };
  })
  .sort((a, b) => {
    let order = b.rank - a.rank;
    let cardIndex = 0;

    while (order === 0 && cardIndex < 5) {
      const aCard = a.hand[cardIndex];
      const bCard = b.hand[cardIndex];
      const aCardStrength = cards.indexOf(aCard);
      const bCardStrength = cards.indexOf(bCard);

      order = bCardStrength - aCardStrength;
      cardIndex += 1;
    }

    return order;
  });

const result = hands.reduce((sum, hand, idx) => {
  const rank = idx + 1;

  return sum + hand.bid * rank;
}, 0);

OutputUtil.outResult(result);

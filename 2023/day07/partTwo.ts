import type { Coords } from '../../types';

import { InputUtil, OutputUtil, MathUtil, ArrayUtil } from '../../utils';

const cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

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

const withJoker = (hand: string) => {
  const baseResult = determineHandCombination(hand);

  // If no joker or already strongest hand, make no change
  if (!hand.includes('J') || baseResult === Combinations.FiveOfAKind) return baseResult;

  const jokerCount = hand.split('').filter((card) => card === 'J').length;

  // Won't have 5-of-kind or full-house, as then there wouldn't be a single joker
  if (jokerCount === 1) {
    if (baseResult === Combinations.FourOfAKind) return Combinations.FiveOfAKind;
    if (baseResult === Combinations.ThreeOfAKind) return Combinations.FourOfAKind;
    if (baseResult === Combinations.TwoPair) return Combinations.FullHouse;
    if (baseResult === Combinations.OnePair) return Combinations.ThreeOfAKind;
    return Combinations.OnePair;
  }

  // Can only be full house, 2 pairs or single pair
  if (jokerCount === 2) {
    if (baseResult === Combinations.FullHouse) return Combinations.FiveOfAKind;
    if (baseResult === Combinations.TwoPair) return Combinations.FourOfAKind;
    return Combinations.ThreeOfAKind;
  }

  if (jokerCount === 3) {
    if (baseResult === Combinations.FullHouse) return Combinations.FiveOfAKind;
    return Combinations.FourOfAKind;
  }

  // Only option left is 4 jokers, which become 5-of-kind
  return Combinations.FiveOfAKind;
};

const hands = InputUtil.strToLines(InputUtil.getInput())
  .map((line) => {
    const [hand, bid] = line.split(' ');
    const combination = withJoker(hand);

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

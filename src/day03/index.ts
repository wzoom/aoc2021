import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const invert = (rate: number, length: number) =>
  // convert back to decimal
  parseInt(
    // Negate `rate` and convert to unsigned int
    (~rate >>> 0)
      // to binary
      .toString(2)
      // cut all preceding 1's in BIN number
      .slice(-length),
    2,
  );

const incrementOnes = (counts: number[], binString: string) =>
  counts.map((count, i) => (binString[i] === "1" ? count + 1 : count - 1));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lineLength = input[0].length;

  const initialCounts = new Array(lineLength).fill(0);

  const counts = input.reduce(incrementOnes, initialCounts);

  //console.log({ counts });

  const binRate = counts.map((count) => (count > 0 ? "1" : "0")).join("");

  const gammaRate = parseInt(binRate, 2);
  const epsilonRate = invert(gammaRate, lineLength);
  //console.log(gammaRate, epsilonRate);

  return gammaRate * epsilonRate;
};

type BinaryBit = "1" | "0";
interface BinaryNumber extends Array<BinaryBit> {}

const getMostCommonBit = (
  numbers: BinaryNumber[],
  bitIndex: number,
): BinaryBit => {
  const count = numbers.reduce(
    (count: number, binNumber) =>
      binNumber[bitIndex] === "1" ? count + 1 : count - 1,
    0,
  );
  return count >= 0 ? "1" : "0";
};

enum RatingType {
  OxygenGenerator,
  CO2Scrubber,
}

const negBit = (bit: BinaryBit): BinaryBit => (bit === "1" ? "0" : "1");
const binToDec = (num: BinaryNumber): number =>
  parseInt(num as unknown as string, 2);

const findRating = (
  ratingType: RatingType,
  numbers: BinaryNumber[],
  bitIndex: number = 0,
): BinaryNumber => {
  // 0. If there is only one number return it
  if (numbers.length <= 1) return numbers[0];

  // 1. Filter only numbers with the most common bit at bitIndex (1's)
  const bitToFilter = getMostCommonBit(numbers, bitIndex);

  const bitToFilterForType =
    ratingType === RatingType.OxygenGenerator
      ? bitToFilter
      : negBit(bitToFilter);

  const filteredNums = numbers.filter(
    (num) => num[bitIndex] === bitToFilterForType,
  );

  // 2. find rating for the next bit in the filtered list
  return findRating(ratingType, filteredNums, bitIndex + 1);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput) as unknown as BinaryNumber[];

  const rating1 = findRating(RatingType.OxygenGenerator, input, 0);
  const rating2 = findRating(RatingType.CO2Scrubber, input, 0);

  return binToDec(rating1) * binToDec(rating2);
};

run({
  part1: {
    tests: [
      {
        input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`,
        expected: "198",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`,
        expected: 230,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

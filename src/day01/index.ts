import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n").map(Number);

const countIncrements = (values: number[]) => {
  let increments = 0
  for (let i = 1; i < values.length; i++) {
    if (values[i] > values[i-1]) increments++;
  }

  return increments
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return countIncrements(input)
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const list = new Array(input.length-2);
  for (let i = 0; i < input.length - 2; i++) {
    list[i] = input[i] + input[i+1] + input[i+2]
  }

  return countIncrements(list);
};

const example = `199
200
208
210
200
207
240
269
260
263`


run({
  part1: {
    tests: [
       {
         input: example,
         expected: "7",
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
         input: example,
         expected: "5",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

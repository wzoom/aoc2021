import run from "aocrunner";

interface Position {
  distance: number;
  depth: number;
}

interface Command {
  type: string;
  units: number;
}

const parseInput = (rawInput: string): Command[] =>
  rawInput.split("\n").map((line) => {
    const tuple = line.split(" ");
    return { type: tuple[0], units: Number(tuple[1]) };
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const position: Position = { distance: 0, depth: 0 };

  input.forEach((command) => {
    switch (command.type) {
      case "forward":
        position.distance += command.units;
        break;
      case "up":
        position.depth -= command.units;
        break;
      case "down":
        position.depth += command.units;
        break;
    }
  });

  return position.distance * position.depth;
};

interface ComplexPosition extends Position {
  aim: number;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const position: ComplexPosition = { distance: 0, depth: 0, aim: 0 };

  input.forEach((command) => {
    switch (command.type) {
      case "forward":
        position.distance += command.units;
        position.depth += position.aim * command.units;
        break;
      case "up":
        position.aim -= command.units;
        break;
      case "down":
        position.aim += command.units;
        break;
    }
  });

  return position.distance * position.depth;
};

run({
  part1: {
    tests: [
      {
        input: `forward 5
down 5
forward 8
up 3
down 8
forward 2`,
        expected: "150",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `forward 5
down 5
forward 8
up 3
down 8
forward 2`,
        expected: "900",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

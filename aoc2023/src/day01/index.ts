import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  let result = 0

  const input = parseInput(rawInput).split("\n").map(i => i.replace(/[^0-9]/g, ''));
  input.forEach(i => {result += parseInt(i[0] + i[i.length - 1])})

  return result.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");
  const letters = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  const regex = new RegExp(`(?=(?<digit>[0-9]|${letters.join('|')}))`, 'g');
  const numbers = input.map(line => {
      const first = [...line.matchAll(regex)].at(0)?.groups?.digit;
      const last = [...line.matchAll(regex)].at(-1)?.groups?.digit;
      let a = 0;
      let b = 0
      if (first) {
        a = Number.isNaN(+first) ? letters.indexOf(first) : +first;
      } else {
        a = 0
      }

      if (last) {
        b = Number.isNaN(+last) ? letters.indexOf(last) : +last;
      } else {
        b = 0
      }
    return a * 10 + b;
  });
  return numbers.reduce((a, b) => a + b, 0).toString();
};

run({
  part1: {
    tests: [
      {
        input: `
        1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet
`,
        expected: "142",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen
        95sixseventwoone
        5threeeightwor
`,
        expected: "424",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

import fs from "fs"

const data = fs.readFileSync("./d1/input", "utf8")

const elves = data.split("\n\n")

const totalSorted = elves
  .map((elve) => elve.split("\n").reduce((total, cur) => (total += +cur), 0))
  .sort((a, b) => b - a)

// answer of first
const [first] = totalSorted
console.log(first)

// // answer to second
const [, second, third] = totalSorted
console.log(first + second + third)

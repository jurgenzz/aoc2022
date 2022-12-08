import fs from "fs"

const data = fs.readFileSync("./d2/input", "utf8")

const rounds = data.split("\n")

enum VALUES {
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3,
}

const mapping = {
  X: 1,
  Y: 2,
  Z: 3,
}

const strenghts = {
  ["A X"]: 3,
  ["A Y"]: 6,
  ["A Z"]: 0,
  ["B X"]: 0,
  ["B Y"]: 3,
  ["B Z"]: 6,
  ["C X"]: 6,
  ["C Y"]: 0,
  ["C Z"]: 3,
}

let total = 0
rounds.forEach((round) => {
  const [, me] = round.split(" ")

  total += strenghts[round]
  total += mapping[me]
})

console.log(total)

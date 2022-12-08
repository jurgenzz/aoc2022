import fs from "fs"

const data = fs.readFileSync("./d2/input", "utf8")

const rounds = data.split("\n")

enum ROUNDS {
  LOSE = "X",
  DRAW = "Y",
  WIN = "Z",
}

enum Types {
  ROCK = "A",
  PAPER = "B",
  SCISSORS = "C",
}

const mapping = {
  A: 1,
  B: 2,
  C: 3,
}

const PAIRS = [
  [Types.PAPER, Types.ROCK],
  [Types.SCISSORS, Types.PAPER],
  [Types.ROCK, Types.SCISSORS],
]

let total = 0
rounds.forEach((round) => {
  const [opponent, type] = round.split(" ")

  switch (type) {
    case ROUNDS.LOSE: {
      const [, me] = PAIRS.find(([val]) => val === opponent)
      total += 0
      total += mapping[me]
      break
    }
    case ROUNDS.DRAW: {
      total += 3
      total += mapping[opponent]
      break
    }
    case ROUNDS.WIN: {
      const [me] = PAIRS.find(([, val]) => val === opponent)
      total += 6
      total += mapping[me]
      break
    }
  }
})

console.log(total)

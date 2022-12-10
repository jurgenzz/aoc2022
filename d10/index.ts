import fs from "fs"

const data = fs.readFileSync("./d10/input", "utf8").split("\n")

let pos = 1
let cycle = 1

const steps = [20, 60, 100, 140, 180, 220]
let str = ""
const res = []

const runCommand = (val?: number) => {
  let arr = [pos, pos + 1, pos + 2]
  const arrValue = cycle % 40
  str += arr.includes(arrValue) ? "#" : "."
  cycle++

  if (val) {
    pos += val
  }

  if (steps.indexOf(cycle)) {
    res.push(cycle * pos)
  }
}

data.forEach((input, i) => {
  const [cmd, value] = input.split(" ")

  if (cmd === "noop") {
    runCommand()
  }
  if (cmd === "addx") {
    runCommand()
    runCommand(+value)
  }
})

// part 1
console.log(
  "part1",
  res.reduce((acc, val) => acc + val)
)

// part 2
console.log("part2\n", str.match(/.{40}/g))

import fs from "fs"

const data = fs.readFileSync("./d13/input", "utf8")

const pairs = [
  "[[2]]",
  "[[6]]",
  ...data
    .split("\n")
    .filter((l) => l)
    .map((row) => row.split("\n")),
]

const validateItem = (left, right) => {
  if (+left === left && right === +right) {
    return left - right
  }

  left = +left === left ? [left] : left
  right = +right === right ? [right] : right

  let found = 0
  left.map((l, i) => {
    const val = validateItem(l, right[i] ?? l)
    found = found || val
    return val
  })

  return found || left.length - right.length
}
const sorted = pairs.sort((lineA: string, lineB: string) => {
  const left = JSON.parse(lineA)
  const right = JSON.parse(lineB)

  return validateItem(left, right)
})

const i1 = sorted.indexOf("[[2]]") + 1
const i2 = sorted.indexOf("[[6]]") + 1
console.log(i1 * i2)

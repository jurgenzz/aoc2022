import fs from "fs"

const data = fs.readFileSync("./d13/input", "utf8")

const pairs = data.split("\n\n").map((row) => row.split("\n"))

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
let arr = []
pairs.forEach(([l, r], idx) => {
  const left = JSON.parse(l)
  const right = JSON.parse(r)

  const isValid = validateItem(left, right) <= 0

  if (isValid) {
    arr.push(idx + 1)
  } else {
  }
})

console.log({ arr }, [1, 2, 4, 6])
const p1 = arr.reduce((a, b) => a + b, 0)
console.log({ p1 })

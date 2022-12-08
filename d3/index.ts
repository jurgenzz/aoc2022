import fs from "fs"

const data = fs.readFileSync("./d3/input", "utf8")

const rucksack = data.split("\n")

let sum = 0

rucksack.forEach((content) => {
  const half = content.length / 2
  const firstItems = content.slice(0, half)
  const secondItems = content.slice(half)
  const repeating = []
  ;[...firstItems].forEach((item, i) => {
    if (secondItems.includes(item) && !repeating.includes(item)) {
      repeating.push(item)
      let pos = item.charCodeAt(0)

      if (pos < 91) {
        pos = pos - 38
      } else {
        pos = pos - 96
      }

      sum += pos
    }
  })
})

console.log(sum)

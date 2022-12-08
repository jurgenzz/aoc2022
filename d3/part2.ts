import fs from "fs"

const data = fs.readFileSync("./d3/input", "utf8")

const rucksack = data.split("\n")

let sum = 0

for (let i = 0; i < rucksack.length; i += 3) {
  const content = rucksack[i]
  const c2 = rucksack[i + 1]
  const c3 = rucksack[i + 2]

  let found = false
  ;[...content].forEach((item) => {
    if (c2.includes(item) && c3.includes(item) && !found) {
      found = true
      let pos = item.charCodeAt(0)

      if (pos < 91) {
        pos = pos - 38
      } else {
        pos = pos - 96
      }

      sum += pos
    }
  })
}

console.log(sum)

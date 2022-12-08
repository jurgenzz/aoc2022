import fs from "fs"

const data = fs.readFileSync("./d6/input", "utf8")

const part1 = 4 // 1292
const part2 = 14 // 3513

for (let i = 0; i < data.length; i++) {
  const end = i + part2
  const marker = data.slice(i, end)
  let valid = !/(.).*\1/.test(marker)
  if (valid) {
    console.log(end)
    break
  }
}

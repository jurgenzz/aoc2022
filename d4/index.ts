import fs from "fs"

const data = fs.readFileSync("./d4/input", "utf8")
//

const pairs = data
  .split("\n")
  .map((pair) => pair.split(",").map((p) => p.split("-").map((n) => +n)))

let result = 0
pairs.forEach(([p1, p2]) => {
  const [s1, e1] = p1
  const [s2, e2] = p2

  if ((s1 <= s2 && e1 >= e2) || (s2 <= s1 && e2 >= e1)) {
    result++
  }
})

console.log(result)

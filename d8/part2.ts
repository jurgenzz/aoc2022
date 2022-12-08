import fs from "fs"

const data = fs.readFileSync("./d8/input", "utf8").split("\n")

let highest = 0
for (let i = 0; i < data.length; i++) {
  const row = data[i]
  const trees = row.split("")

  trees.forEach((tree, idx) => {
    // visible from left & right
    const left = trees.slice(0, idx).reverse()
    const right = trees.slice(idx + 1)

    const visibleFromLeft = left.findIndex((v) => v >= tree) + 1 || left.length
    const visibleFromRight = right.findIndex((v) => v >= tree) + 1 || right.length

    // visible from top & bottom
    const columns = data.map((row) => row[idx])
    const top = columns.slice(0, i).reverse()
    const bottom = columns.slice(i + 1)

    const visibleFromTop = top.findIndex((v) => v >= tree) + 1 || top.length
    const visibleFromBottom = bottom.findIndex((v) => v >= tree) + 1 || bottom.length

    const sum = visibleFromBottom * visibleFromTop * visibleFromRight * visibleFromLeft

    if (sum > highest) {
      highest = sum
    }
  })
}

console.log(highest)
// 230112

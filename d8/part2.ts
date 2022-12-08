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

    const leftIndex = left.findIndex((v) => v >= tree)
    const visibleFromLeft = leftIndex === -1 ? left.length : leftIndex + 1
    const rightIndex = right.findIndex((v) => v >= tree)
    const visibleFromRight = rightIndex === -1 ? right.length : rightIndex + 1

    // visible from top & bottom
    const columns = data.map((row) => row[idx])
    const top = columns.slice(0, i).reverse()
    const bottom = columns.slice(i + 1)

    const topIndex = top.findIndex((v) => v >= tree)
    const visibleFromTop = topIndex === -1 ? top.length : topIndex + 1
    const bottomIndex = bottom.findIndex((v) => v >= tree)
    const visibleFromBottom =
      bottomIndex === -1 ? bottom.length : bottomIndex + 1

    const sum =
      visibleFromBottom * visibleFromTop * visibleFromRight * visibleFromLeft

    if (sum > highest) {
      highest = sum
    }
  })
}

console.log(highest)
// 230112

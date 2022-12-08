import fs from "fs"

const data = fs.readFileSync("./d8/input", "utf8").split("\n")

let sum = 0
for (let i = 0; i < data.length; i++) {
  const row = data[i]
  const trees = row.split("")

  trees.forEach((tree, idx) => {
    // all edges are always visible
    const isEdge =
      i === 0 || i === data.length - 1 || idx === 0 || idx === trees.length - 1

    // visible from left & right
    const left = trees.slice(0, idx)
    const right = trees.slice(idx + 1)

    const visibleFromLeft = !left.some((tree2) => tree2 >= tree)
    const visibleFromRight = !right.some((tree2) => tree2 >= tree)

    // visible from top & bottom
    const columns = data.map((row) => row[idx])
    const top = columns.slice(0, i)
    const bottom = columns.slice(i + 1)

    const visibleFromTop = !top.some((tree2) => tree2 >= tree)
    const visibleFromBottom = !bottom.some((tree2) => tree2 >= tree)

    if (
      isEdge ||
      visibleFromBottom ||
      visibleFromTop ||
      visibleFromLeft ||
      visibleFromRight
    ) {
      sum++
    }
  })
}

console.log(sum)

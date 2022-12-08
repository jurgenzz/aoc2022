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

    let visibleFromLeft = 0
    for (let i2 = 0; i2 < left.length; i2++) {
      const t = left[i2]

      visibleFromLeft++
      if (t >= tree) {
        break
      }
    }

    let visibleFromRight = 0
    for (let i2 = 0; i2 < right.length; i2++) {
      const t = right[i2]

      visibleFromRight++
      if (t >= tree) {
        break
      }
    }
    // visible from top & bottom
    const columns = data.map((row) => row[idx])
    const top = columns.slice(0, i).reverse()
    const bottom = columns.slice(i + 1)

    let visibleFromBottom = 0
    for (let i2 = 0; i2 < bottom.length; i2++) {
      const t = bottom[i2]

      visibleFromBottom++
      if (t >= tree) {
        break
      }
    }

    let visibleFromTop = 0
    for (let i2 = 0; i2 < top.length; i2++) {
      const t = top[i2]

      visibleFromTop++
      if (t >= tree) {
        break
      }
    }

    const sum =
      visibleFromBottom * visibleFromTop * visibleFromRight * visibleFromLeft

    if (sum > highest) {
      highest = sum
    }
  })
}

console.log(highest)

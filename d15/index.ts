import fs from "fs"

const data = fs.readFileSync("./d15/input", "utf8").split("\n")

const coords = data.map((l) => l.match(/-?\d+/g).map((num) => +num))

// const row = 10
const row = 2000000

let atRow10 = []
coords.forEach(([sX, sY, bX, bY], i) => {
  const diff = Math.abs(bY - sY) + Math.abs(bX - sX)
  const yStart = sY - diff
  const yEnd = sY + diff

  const isDown = yStart <= row && sY >= row
  const isUp = yEnd >= row && sY <= row
  if (isDown || isUp) {
    const d = isUp ? yEnd - row : row - yStart
    const y = [sX - d, sX + d].sort((a, b) => a - b)
    if (!atRow10.length) {
      atRow10 = y
    } else {
      atRow10[0] = Math.min(atRow10[0], y[0])
      atRow10[1] = Math.max(atRow10[1], y[1])
    }
  }
})

console.log(atRow10[1] - atRow10[0]) //4502208

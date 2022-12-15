import fs from "fs"

const data = fs.readFileSync("./d15/input", "utf8").split("\n")

const coords = data.map((l) => l.match(/-?\d+/g).map((num) => +num))

// const count = 20
const count = 4000000

const rows = []
coords.forEach(([sX, sY, bX, bY], i) => {
  if (i !== 6) {
    // return
  }
  const diff = Math.abs(bY - sY) + Math.abs(bX - sX)
  const yStart = sY - diff
  const yEnd = sY + diff

  for (let row = 0; row < count; row++) {
    const isDown = yStart <= row && sY >= row
    const isUp = yEnd >= row && sY <= row
    if (isDown || isUp) {
      const d = isUp ? yEnd - row : row - yStart
      let y = [sX - d, sX + d].map((c) => (c < 0 ? 0 : c)).sort((a, b) => a - b)
      rows[row] = rows[row] || []

      if (rows[row].length) {
        // merge
        for (let i = 0; i < rows[row].length; i++) {
          const row2 = rows[row][i]

          const [x1, x2] = y
          const [x3, x4] = row2

          if ((x1 <= x3 && x2 >= x3) || (x1 <= x4 && x2 >= x3)) {
            y[0] = Math.min(x1, x3)
            y[1] = Math.max(x2, x4)
            rows[row].splice(i, 1)
            i--
          }
        }
      }
      rows[row].push(y)
      rows[row].sort((a, b) => a[0] - b[0])
    }
  }
})

rows.forEach((row, y) => {
  const [p1, p2] = row
  if (p2) {
    if (p2[0] - p1[1] > 1) {
      const x = p1[1] + 1
      const res = x * 4e6 + y
      console.log(res)
    }
  }
})

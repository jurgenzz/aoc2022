import fs from "fs"

const commands = fs
  .readFileSync("./d14/input", "utf8")
  .split("\n")
  .map((cmd) => cmd.split("->").map((xy) => xy.split(",").map((v) => +v)))

const xCoords = commands.reduce((prev, cmd) => [...prev, ...cmd.map(([x]) => x)], []) as number[]
const yCoords = commands.reduce((prev, cmd) => [...prev, ...cmd.map(([, y]) => y)], []) as number[]
const minX = Math.min(...xCoords)
const maxX = Math.max(...xCoords)
const maxY = Math.max(...yCoords)

const startIndex = 500

const rows = Array(maxY + 2)
  .fill(null)
  .map(() => [...Array(maxX + maxY + 1).fill(".")])

commands.forEach((coords, i) => {
  coords.forEach(([x, y], idx) => {
    const prev = coords[idx - 1]
    if (!prev) {
      return
    }
    const [fromX, fromY] = prev

    const xDiff = Math.abs(fromX - x)
    const yDiff = Math.abs(fromY - y)

    let lowestX = Math.min(fromX, x)
    let lowestY = Math.min(fromY, y)

    for (let i = 0; i <= xDiff; i++) {
      for (let j = 0; j <= yDiff; j++) {
        const nextX = lowestX + i
        const nextY = lowestY + j
        rows[nextY][nextX] = "#"
      }
    }
  })
})

const isValid = (x: number, y: number) => {
  return !["#", "O"].includes(rows[y][x])
}

let x = startIndex
let y = 0

let sands = 0
while (true) {
  const canMoveDown = rows[y + 1] && isValid(x, y + 1)

  if (canMoveDown) {
    y++
    continue
  }

  const canMoveDiagnollyLeft = rows[y + 1] && isValid(x - 1, y + 1)
  const canMoveDiagnollyRight = rows[y + 1] && isValid(x + 1, y + 1)

  if (!canMoveDown) {
    if (canMoveDiagnollyLeft) {
      x--
      y++
      continue
    }

    if (canMoveDiagnollyRight) {
      x++
      y++
      continue
    }
    rows[y][x] = "O"

    sands++
    if (y === 0 && x === 500) {
      console.log("p2", { sands })
      break
    }
    y = 0
    x = startIndex
  }
}

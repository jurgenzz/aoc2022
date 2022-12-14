import fs from "fs"

const commands = fs
  .readFileSync("./d14/input", "utf8")
  .split("\n")
  .map((cmd) => cmd.split("->").map((xy) => xy.split(",").map((v) => +v)))

const xCoords = commands.reduce((prev, cmd) => [...prev, ...cmd.map(([x]) => x)], []) as number[]
const yCoords = commands.reduce((prev, cmd) => [...prev, ...cmd.map(([, y]) => y)], []) as number[]
const minX = Math.min(...xCoords)
const maxX = Math.max(...xCoords)

const minY = Math.min(...yCoords)
const maxY = Math.max(...yCoords)

const startIndex = 500 - minX

const rows = Array(maxY + 1)
  .fill(null)
  .map(() => [...Array(maxX - minX + 1).fill(".")])

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
        const nextX = lowestX + i - minX
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
  rows[y][x] = "C"

  if (x === -1 || x > maxX || y + 1 >= rows.length) {
    console.log("Finished p1", { sands })
    break
  }
  const canMoveDown = isValid(x, y + 1)

  if (canMoveDown) {
    y++
    continue
  }

  const nextIsLine = false
  const canMoveDiagnollyLeft = !nextIsLine && isValid(x - 1, y + 1)
  const canMoveDiagnollyRight = !nextIsLine && isValid(x + 1, y + 1)

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
    y = 0
    x = startIndex
  }
}

console.log(rows.map((r) => r.join("")).join("\n"))

import fs from "fs"

const data = fs.readFileSync("./d9/input", "utf8").split("\n")

const visitedX = new Map([["0-0", true]])
const visitedY = new Map([["0-0", true]])

let hPos = {
  x: 0,
  y: 0,
}
let tPos = {
  x: 0,
  y: 0,
}

const moveStep = (obj: { x: number; y: number }, dir: string) => {
  switch (dir) {
    case "U": {
      obj = {
        x: obj.x,
        y: obj.y + 1,
      }
      break
    }
    case "D": {
      obj = {
        x: obj.x,
        y: obj.y - 1,
      }
      break
    }
    case "L": {
      obj = {
        x: obj.x - 1,
        y: obj.y,
      }
      break
    }
    case "R": {
      obj = {
        x: obj.x + 1,
        y: obj.y,
      }
      break
    }
  }
  return obj
}
data.forEach((cmd) => {
  const [dir, steps] = cmd.split(" ")

  for (let i = 0; i < +steps; i++) {
    hPos = moveStep(hPos, dir)

    let tDir = []

    const xDiff = hPos.x - tPos.x
    const yDiff = hPos.y - tPos.y

    if (xDiff >= 2) {
      tDir.push("R")
    }
    if (xDiff <= -2) {
      tDir.push("L")
    }

    if (yDiff >= 2) {
      tDir.push("U")
    }
    if (yDiff <= -2) {
      tDir.push("D")
    }

    // check diagonally
    if (tDir.length) {
      if (xDiff === 1) {
        tDir.push("R")
      }
      if (xDiff === -1) {
        tDir.push("L")
      }
      if (yDiff === 1) {
        tDir.push("U")
      }
      if (yDiff === -1) {
        tDir.push("D")
      }
    }

    if (tDir.length) {
      tDir.forEach((td) => {
        tPos = moveStep(tPos, td)
      })
    }

    visitedX.set(`${hPos.x}-${hPos.y}`, true)
    visitedY.set(`${tPos.x}-${tPos.y}`, true)
  }
})

console.log(visitedY.size)

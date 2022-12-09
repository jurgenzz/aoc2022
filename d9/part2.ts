import fs from "fs"

const data = fs.readFileSync("./d9/input", "utf8").split("\n")

const visitedX = new Map([["0-0", true]])
const visitedY = new Map([["0-0", true]])

let hPos = {
  x: 0,
  y: 0,
}

let tails: { x: number; y: number }[] = new Array(9).fill({
  x: 0,
  y: 0,
})

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

const checkTails = (arr: { x: number; y: number }[]) => {
  let newArr = [...arr]
  newArr.forEach((curr, i) => {
    if (i === 0) {
      return
    }
    const prev = newArr[i - 1]
    console.log(i)
    const xDiff = prev.x - curr.x
    const yDiff = prev.y - curr.y

    const directions = []
    if (xDiff >= 2) {
      directions.push("R")
    }
    if (xDiff <= -2) {
      directions.push("L")
    }

    if (yDiff >= 2) {
      directions.push("U")
    }
    if (yDiff <= -2) {
      directions.push("D")
    }

    // check diagonally
    if (directions.length) {
      if (xDiff === 1) {
        directions.push("R")
      }
      if (xDiff === -1) {
        directions.push("L")
      }
      if (yDiff === 1) {
        directions.push("U")
      }
      if (yDiff === -1) {
        directions.push("D")
      }
    }

    if (directions.length) {
      directions.forEach((td) => {
        curr = moveStep(curr, td)
      })
    }
    newArr[i] = curr
  })
  return newArr
}
data.forEach((cmd) => {
  const [dir, steps] = cmd.split(" ")

  for (let i = 0; i < +steps; i++) {
    hPos = moveStep(hPos, dir)

    let arr = [hPos, ...tails]
    tails = checkTails(arr).slice(1)

    const tail = tails.at(-1)
    visitedX.set(`${hPos.x}-${hPos.y}`, true)
    visitedY.set(`${tail.x}-${tail.y}`, true)
  }
})

console.log(visitedY.size)

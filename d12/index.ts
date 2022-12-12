import fs from "fs"

const data = fs.readFileSync("./d12/input", "utf8")

const rows = data.split("\n").map((row) => row.split(""))

let copy = [...rows]
  .map((c: any) => c.join(""))
  .join("\n")
  .replace(/./g, ".")

function print(pos, letter, log = true) {
  let [x, y] = pos
  const index = y * (rows[0].length + 1) + x
  let c = [...copy]
  c[index] = letter || "#"
  copy = c.join("")
  if (log) {
    console.log(copy)
  }
  return copy
}

const checkLetter = (curr: string, next: string) => {
  // special case
  if (curr === "S") {
    return true
  }
  return next.charCodeAt(0) - curr.charCodeAt(0) <= 1
}

const dirLookup = [
  [1, 0],
  [0, 1],
  [0, -1],
  [-1, 0],
]

let queue = []
let visited = new Set([])

function lookup(start: string, end) {
  rows.forEach((row, y) => {
    row.forEach((col, x) => {
      if (col === start) {
        queue.push([start, [x, y], 0])
      }
    })
  })

  while (queue.length) {
    const [curr, [x, y], steps] = queue.shift()
    print([x, y], curr)
    for (const dir of dirLookup) {
      const [p1, p2] = dir
      const nextClimb = [x + p1, y + p2]
      const key = `${nextClimb}`
      const next = rows[nextClimb[1]]?.[nextClimb[0]]
      if (end === next) {
        return steps + 1
      }
      const isValid = next && checkLetter(curr, next) && !visited.has(key)

      if (isValid) {
        visited.add(key)
        queue.push([next, nextClimb, steps + 1])
      }
    }
  }
}

// p1
console.log(lookup("S", "E"))

// p2
// console.log(lookup("a", "E"))

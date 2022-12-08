import fs from "fs"

const data = fs.readFileSync("./d7/input", "utf8").split("\n")

const sizes = new Map()
const pos = []
data.forEach((line) => {
  if (line[0] === "$") {
    const [, cmd, action] = line.split(" ")
    // is command
    if (cmd === "ls") {
      // can ignore
      return
    }

    if (cmd === "cd") {
      // handle movement

      if (action === "..") {
        pos.pop()
      } else {
        // if (action === "/") {
        pos.push(action)
        // }
      }
    }
    return
  }

  const [type, name] = line.split(" ")

  if (type === "dir") {
    // ignore for now
    return
  }

  let dirName = pos.join("-")
  let size = sizes.get(dirName) || 0
  size += +type
  sizes.set(dirName, size)
})

let totalByFolders = new Map()
;[...sizes.entries()].forEach(([name, size]) => {
  const names = name.split("-")

  names.forEach((_, i) => {
    let dirName = names.slice(0, i + 1).join("-")

    let a = totalByFolders.get(dirName) || 0
    a += size
    totalByFolders.set(dirName, a)
  })
})

let t1 = 0
let diff = 0
let sizeToRemove = 0
let total = totalByFolders.get("/")
let spaceNeeded = 30000000 - (70000000 - total)
;[...totalByFolders.entries()].forEach(([name, size]) => {
  console.log(name, size)

  let newDiff = size - spaceNeeded
  diff = diff || newDiff
  if (newDiff >= 0 && newDiff < diff) {
    diff = newDiff
    sizeToRemove = size
  }

  if (name === "/") {
    return
  }

  if (size < 100000) {
    t1 += size
  }
})

console.log(t1)
console.log(sizeToRemove)

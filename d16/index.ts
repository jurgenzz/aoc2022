import { match } from "assert"
import fs from "fs"

const data = fs
  .readFileSync("./d16/test", "utf8")
  .split("\n")
  .map((l) => l.match(/[A-Z]{2}|\d+/g))

const map = new Map()
const routes = new Map()
data.forEach((line) => {
  const [valve, p, ...rest] = line
  const pressure = +p
  const values = []

  routes.set(valve, rest)
  if (pressure) {
    for (let i = 0; i < 30; i++) {
      values.push(i * pressure)
    }
  }
  if (values.length) {
    map.set(valve, values)
  }
})

// console.log(routes.entries())
let current = "AA"
// let i = 30
let i = 0
// console.log(map.entries())

const sums = []

const findDestination = (
  cur: string,
  destination,
  steps = 1,
  stepsTaken = new Set(),
  start = cur,
  route = [],
  minutes = []
) => {
  //   console.log({ start, destination })
  const possibleRoutes = routes.get(cur)
  //   console.log({ possibleRoutes, cur })
  route = [...route, cur]
  //   console.log(route)
  if (possibleRoutes.includes(destination)) {
    minutes.push(steps)
    // console.log({ minutes })
    return [minutes, route.join(",")]
  }
  for (let j = 0; j < possibleRoutes.length; j++) {
    const way = possibleRoutes[j]
    // console.log({ possibleRoutes })

    if (way === destination) {
      //   console.log({ start, destination, steps, way, route: route.join(",") })
      minutes.push(steps)
      //   console.log("ye", { minutes })
      continue
    } else {
      if (i > 100000000 || stepsTaken.has(`${cur}-${way}`)) {
        console.log("exit", i, cur, way, route)
        continue
      }
      stepsTaken.add(`${cur}-${way}`)
      i++
      findDestination(way, destination, steps + 1, new Set(stepsTaken), start, route, minutes)
    }
  }
  //   console.log("here", { minutes, route, start, destination })
  if (!minutes.length) {
    console.log({ minutes })
  }
  return [minutes, route.join(",")]
}

let hello = []

const findNextBestRoute = (start, opened = new Set(), mins = 0, next?) => {
  const possibleRoutes = [...map.keys()].filter((k) => !opened.has(k))

  if (possibleRoutes.length) {
    for (let i = 0; i < possibleRoutes.length; i++) {
      const r = possibleRoutes[i]

      if (start === r) {
        continue
      }
      const nextOpened = new Set(opened)
      nextOpened.add(r)
      const steps = findDestination(start, r)

      console.log(steps[0])

      let minimal = Math.min(...steps[0])
      mins += minimal

      //   console.log({ steps, start, r })
      mins += findNextBestRoute(r, nextOpened, mins)
    }
  } else {
    if (!next) {
      hello.push(mins)
    }
  }
  return mins
}

// for (const r of possibleRoutes) {
console.log(findNextBestRoute("AA"))
// }
console.log(hello)

// findNextBestRoute("AA", i, [], new Set(), new Set())
// // for (let i = 0; i < 30; i) {
//   possibleRoutes.forEach(r => {
//     possibleRoutes
//   })
// }

// console.log(Math.max(...sums))

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
  map.set(valve, values)
})

// console.log(routes.entries())
let current = "AA"
let i = 30
// console.log(map.entries())

const sums = []

const findNextBestRoute = (cur, c, route, moves: Set<String>, openValves: Set<String>, values = 0, prev?, prevKey?) => {
  if (c <= 0) {
    // if (values) {
    // console.log(values)
    // }
    return
  }

  const isOpen = openValves.has(cur)
  const value = !isOpen && map.get(cur)[c]

  if (value) {
    // skip first
    findNextBestRoute(cur, c - 1, [...route], new Set(moves), new Set(openValves), values, prev, prevKey)
    // console.log(values)
    // console.log(route.join(","))
    c--
    values += value
    openValves.add(cur)
  }

  const possibleRoutes = routes.get(cur)

  route = [...route, cur]

  //   console.log(route.join(","))

  c--
  possibleRoutes.forEach((r) => {
    // console.log({ r, prev, cur })
    const key = `${prev}-${cur}-${r}`

    // console.log(prevKey, key)
    let keys = routes.get(r).map((k) => `${prev}-${cur}-${r}`)

    // console.log({ key, values })

    // const nextKey =
    // console.log(key, w)
    // console.log({ route, key, c, r, cur })
    if (c <= 0) {
      if (values) {
        if (sums.indexOf(values) === -1) {
          sums.push(values)
        }
      }
      return
    }
    // console.log("route", route.join(","))
    // console.log({ key, prevKey })
    const rString = route.join(",")
    if (rString === "AA,DD,CC,BB,AA,II,JJ,II,AA,DD,EE,FF,GG,FF,EE") {
      console.log({ values })
    }
    if (rString.indexOf("AA,DD,CC") === 0) {
      //   console.log("route", route.join(","))
      //   console.log({ key, prevKey })
    }
    if (rString.indexOf(`${prev},${cur},${r}`) !== -1) {
      //   console.log()
      return
    }
    // if (key === prevKey || prev === r) {
    //   return
    // }
    // if (moves.has(key)) {
    //   return
    // }
    const m = new Set(moves)
    m.add(key)
    findNextBestRoute(r, c, route, m, new Set(openValves), values, cur, key)
  })
}

findNextBestRoute("AA", i, [], new Set(), new Set())
// // for (let i = 0; i < 30; i) {
//   possibleRoutes.forEach(r => {
//     possibleRoutes
//   })
// }

console.log(Math.max(...sums))

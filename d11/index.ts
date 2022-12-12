import fs from "fs"

const data = fs.readFileSync("./d11/input.txt", "utf8")

const monkeys = data
  .split("\n\n")
  .map((item) => {
    return item
      .split("\n")
      .map((instruction) => {
        const [, cmd] = instruction.split(":")
        let cmds = cmd.match(/\d+|(\+|-|\*|\/)/g)?.map((c) => (+c ? +c : c))
        return cmds
      })
      .filter((c) => c)
  })
  .map(([items, [action, value], [divideBy], [ifTrue], [ifFalse]]) => ({
    items: items.map((c) => +c),
    action,
    value: +value,
    divideBy,
    ifTrue: +ifTrue,
    ifFalse: +ifFalse,
  }))

const inspected = new Array(monkeys.length).fill(0)

for (let i = 0; i < 20; i++) {
  monkeys.forEach((monkey, j) => {
    const { items, action, value, divideBy, ifTrue, ifFalse } = monkey
    items.forEach((item: number) => {
      inspected[j]++

      const newWorryLevel = Math.floor((action === "*" ? item * (value || item) : item + (value || item)) / 3)
      const canDivide = newWorryLevel % +divideBy === 0

      const goTo = canDivide ? ifTrue : ifFalse

      monkeys[goTo].items.push(newWorryLevel)
      monkey.items = monkey.items.slice(1)
    })
  })
}

const [first, second] = inspected.sort((a, b) => b - a)
console.log(first * second) // 95472

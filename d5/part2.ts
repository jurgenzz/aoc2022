import fs from "fs"

const data = fs.readFileSync("./d5/input", "utf8")

const lines = data.split("\n")

const stacksInput = lines.slice(0, 8)

const stacks = []
stacksInput.forEach((stack) => {
  const match = stack.match(/\s{4}|\w/g)
  match.forEach((item, i) => {
    stacks[i] = stacks[i] || []
    if (item.match(/\w/g)) {
      stacks[i].push(item)
    }
  })
})

const commands = lines.slice(10)
commands.forEach((cmd) => {
  const [amount, from, to] = cmd.match(/(\d+)/g)

  const move = stacks[+from - 1].splice(0, amount)
  //   console.log(amount, move)
  stacks[+to - 1] = [...move, ...stacks[+to - 1]]
})

console.log(stacks.map((c) => c[0]).join(""))

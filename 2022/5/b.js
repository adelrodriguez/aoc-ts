const __dirname = new URL(".", import.meta.url).pathname
const input = await Deno.readTextFile(__dirname + "/input.txt")

// Clean input so we get a matrix of letters
const inputLines = input.split("\n")
// After the divider line, we have the commands
const dividerLine = inputLines.findIndex((line) => line.length === 0)
const stacks = inputLines.slice(0, dividerLine - 1)
const textCommands = inputLines.slice(dividerLine + 1)

const rows = []

for (let i = 0; i < stacks.length; i++) {
  rows.push([])
  for (let f = 0; f < stacks[i].length; f += 4) {
    rows[i].push(stacks[i].slice(f, f + 3))
  }
}

const crates = []

for (let i = 0; i < rows[0].length; i++) {
  crates.push([])

  for (let f = 0; f < rows.length; f++) {
    crates[i].push(rows[f][i])
  }

  crates[i] = crates[i].filter((crate) => crate !== "   ")
  crates[i].reverse()
}

const commands = textCommands.map((command) =>
  command
    .replace("move ", "")
    .replace(/ from | to /g, ",")
    .split(",")
    .map(Number)
)

commands.forEach(([move, from, to]) => {
  // Move the x amount of crates from one stack to another
  crates[to - 1].push(
    ...crates[from - 1]
      // Since we are splicing, we take from the end of the array
      .splice(crates[from - 1].length - move, move)
  )
})

// Console log the top crate of each stack
const result = crates
  .map((crate) => crate[crate.length - 1])
  .join("")
  .replace(/\[|\]/g, "")
console.log(result)

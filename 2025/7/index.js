import Bun from "bun"
import path from "node:path"

async function getInput() {
  const file = await Bun.file(
    path.join(import.meta.dirname, "input.txt")
  ).text()

  return file.split("\n")
}

async function partOne() {
  const input = await getInput()

  let current = []

  let answer = 0

  for (const row of input) {
    if (row.includes("S")) {
      current = [row.indexOf("S")]
      continue
    }

    const next = new Set()
    for (const index of current) {
      if (row[index] === "^") {
        next.add(index - 1)
        next.add(index + 1)
        answer += 1
      } else if (row[index] === ".") {
        next.add(index)
      }
    }

    if (next.size > 0) {
      current = [...next]
    }
  }

  return answer
}

async function partTwo() {
  const input = await getInput()

  let current = new Map()

  for (const row of input) {
    if (row.includes("S")) {
      current = new Map([[row.indexOf("S"), 1]])
      continue
    }

    const next = new Map()
    for (const [index, pathCount] of current) {
      if (row[index] === "^") {
        const a = index - 1
        const b = index + 1

        next.set(a, (next.get(a) || 0) + pathCount)
        next.set(b, (next.get(b) || 0) + pathCount)
      } else if (row[index] === ".") {
        next.set(index, (next.get(index) || 0) + pathCount)
      }
    }

    if (next.size > 0) {
      current = next
    }
  }

  return [...current.values()].reduce((a, b) => a + b, 0)
}

console.log("The answer to part one is:", await partOne())
console.log("The answer to part two is:", await partTwo())

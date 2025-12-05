import Bun from "bun"
import path from "node:path"

async function getInput() {
  const file = await Bun.file(
    path.join(import.meta.dirname, "input.txt")
  ).text()

  return file
    .trim()
    .split("\n")
    .map((line) => line.trim().split(""))
}

function getAdjacent(input: string[][], row: number, column: number) {
  const arr: (string | undefined)[] = []

  arr.push(input[row - 1]?.[column])
  arr.push(input[row + 1]?.[column])
  arr.push(input[row]?.[column - 1])
  arr.push(input[row]?.[column + 1])
  arr.push(input[row - 1]?.[column - 1])
  arr.push(input[row - 1]?.[column + 1])
  arr.push(input[row + 1]?.[column - 1])
  arr.push(input[row + 1]?.[column + 1])

  return arr.filter((v) => v === "@")
}

async function partOne() {
  const input = await getInput()

  let answer = 0

  for (let i = 0; i < input.length; i++) {
    const row = input[i] as string[]

    for (let j = 0; j < row.length; j++) {
      const cell = row[j]

      if (!cell || cell !== "@") {
        continue
      }

      const adjacent = getAdjacent(input, i, j)

      if (adjacent.length < 4) {
        answer += 1
      }
    }
  }

  return answer
}

async function partTwo() {
  const input = await getInput()

  let answer = 0

  // biome-ignore lint/nursery/noUnnecessaryConditions: we need to keep running until no more removals are needed
  while (true) {
    const removed: number[][] = []

    for (let i = 0; i < input.length; i++) {
      const row = input[i] as string[]

      for (let j = 0; j < row.length; j++) {
        const cell = row[j]

        if (!cell || cell !== "@") {
          continue
        }

        const adjacent = getAdjacent(input, i, j)

        if (adjacent.length < 4) {
          answer += 1
          removed.push([i, j])
        }
      }
    }

    if (removed.length === 0) {
      break
    }

    for (const [row, column] of removed) {
      // @ts-expect-error - we know the index is valid
      input[row][column] = "."
    }
  }

  return answer
}

console.log("Part one answer is:", await partOne())
console.log("Part two answer is:", await partTwo())

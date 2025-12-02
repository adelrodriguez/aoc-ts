import Bun from "bun"
import path from "node:path"

async function getInput() {
  const file = await Bun.file(
    path.join(import.meta.dirname, "input.txt")
  ).text()

  return file.trim().split("\n")
}

async function partOne(initialPosition: number) {
  let answer = 0

  const input = await getInput()

  let position = initialPosition

  for (const row of input) {
    const direction = row.slice(0, 1)
    const num = +row.slice(1)
    const x = direction === "R" ? num : -num

    position += x % 100

    if (position < 0) {
      position += 100
    } else if (position >= 100) {
      position -= 100
    }

    if (position === 0) {
      answer += 1
    }
  }

  return answer
}

async function partTwo(initialPosition: number) {
  let answer = 0

  const input = await getInput()

  let position = initialPosition

  for (const row of input) {
    const direction = row.slice(0, 1)
    const num = +row.slice(1)
    const x = direction === "R" ? num : -num

    const start = position

    position += x % 100

    let clicks = Math.floor(num / 100)

    if (position < 0) {
      position += 100
    } else if (position >= 100) {
      position -= 100
    }

    if (position === 0) {
      clicks += 1
    } else if (start !== 0) {
      clicks += Math.abs(Math.floor((start + (x % 100)) / 100))
    }

    answer += clicks
  }

  return answer
}

console.log("Part one answer is:", await partOne(50))
console.log("Part two answer is:", await partTwo(50))

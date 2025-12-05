import Bun from "bun"
import path from "node:path"

async function getInput() {
  const file = await Bun.file(
    path.join(import.meta.dirname, "input.txt")
  ).text()

  return file
    .split("\n")
    .filter(Boolean)
    .map((line) => line.trim().split("").map(Number))
}

function toNumber(digits: number[]) {
  return Number.parseInt(digits.join(""), 10)
}

async function partOne() {
  const input = await getInput()
  let answer = 0

  for (const row of input) {
    let left = row[0] as number
    let right = row[1] as number

    for (const number of row.slice(2)) {
      const current = toNumber([left, right])
      const leftCheck = toNumber([left, number])
      const rightCheck = toNumber([right, number])

      switch (Math.max(leftCheck, rightCheck, current)) {
        case leftCheck:
          right = number
          break
        case rightCheck:
          left = right
          right = number
          break
        default:
          break
      }
    }

    answer += toNumber([left, right])
  }

  return answer
}

async function partTwo() {
  const input = await getInput()
  let answer = 0

  for (const row of input) {
    const digits = row.slice(0, 12)

    for (let i = digits.length; i < row.length; i++) {
      const number = row[i] as number
      const current = toNumber(digits)
      const possibilities = digits.map((_, arrIndex) => {
        const copy = [...digits]
        copy.splice(arrIndex, 1)
        copy.push(number)
        return toNumber(copy)
      })

      const max = Math.max(...possibilities, current)
      const index = possibilities.indexOf(max)

      switch (max) {
        case current:
          break
        case possibilities[index]:
          digits.splice(index, 1)
          digits.push(number)
          break
        default:
          break
      }
    }

    answer += toNumber(digits)
  }

  return answer
}

console.log("Part one answer is:", await partOne())
console.log("Part two answer is:", await partTwo())

// I got tired of TypeScript by this one.

import Bun from "bun"
import path from "node:path"

async function getInput() {
  const file = await Bun.file(
    path.join(import.meta.dirname, "input.txt")
  ).text()

  return file.split("\n\n").map((line) => line.split("\n"))
}

async function partOne() {
  const [ranges, ids] = await getInput()
  const splitRanges = ranges.map((range) => range.split("-").map(Number))
  const numbers = ids.map((id) => Number.parseInt(id, 10))

  let answer = 0

  for (const number of numbers) {
    for (const [start, end] of splitRanges) {
      if (number >= start && number <= end) {
        answer += 1
        break
      }
    }
  }

  return answer
}

async function partTwo() {
  const [ranges] = await getInput()
  const splitRanges = ranges
    .map((range) => range.split("-").map(Number))
    .sort((a, b) => a[0] - b[0])

  const mergedRanges = splitRanges.reduce((acc, curr) => {
    if (acc.length === 0) {
      acc.push(curr)
      return acc
    }

    if (curr[0] <= acc.at(-1)[1]) {
      acc.at(-1)[1] = Math.max(acc.at(-1)[1], curr[1])
      return acc
    }

    acc.push(curr)
    return acc
  }, [])

  let answer = 0

  for (const [start, end] of mergedRanges) {
    answer += end - start + 1
  }

  return answer
}

console.log("Part one answer is:", await partOne())
console.log("Part two answer is:", await partTwo())

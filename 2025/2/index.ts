import Bun from "bun"
import path from "node:path"

async function getInput() {
  const file = await Bun.file(
    path.join(import.meta.dirname, "input.txt")
  ).text()

  return file.trim().split(",")
}

async function partOne() {
  const input = await getInput()

  let answer = 0

  for (const range of input) {
    const [start, end] = range.split("-").map(Number) as [number, number]

    for (let i: number = start; i <= end; i++) {
      const digits = i.toString()
      const a = digits.slice(0, digits.length / 2)
      const b = digits.slice(digits.length / 2)

      if (a === b) {
        answer += i
      }
    }
  }

  return answer
}

async function partTwo() {
  const input = await getInput()

  let answer = 0

  for (const range of input) {
    const [start, end] = range.split("-").map(Number) as [number, number]

    for (let i = start; i <= end; i++) {
      const mainString = i.toString()

      let substringLength = 1

      while (substringLength <= mainString.length / 2) {
        const sub = mainString.slice(0, substringLength)

        if (
          sub.repeat(mainString.length / sub.length) === mainString &&
          mainString.length % sub.length === 0
        ) {
          answer += i
          break
        }

        substringLength++
      }
    }
  }

  return answer
}

console.log("Part one answer is:", await partOne())
console.log("Part two answer is:", await partTwo())

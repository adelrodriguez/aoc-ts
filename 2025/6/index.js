import Bun from "bun"
import path from "node:path"

async function getInput() {
  const file = await Bun.file(
    path.join(import.meta.dirname, "input.txt")
  ).text()

  return file.trim().split("\n")
}

function calculate(first, second, operation) {
  switch (operation) {
    case "+":
      return first + second
    case "*":
      return first * second
    default:
      break
  }
}

function transpose(matrix) {
  return matrix[0].map((_, index) => matrix.map((row) => row[index]))
}

export async function partOne() {
  const input = await getInput()
  const rows = input.map((cell) => cell.trim().split(" ").filter(Boolean))
  const transposed = transpose(rows)

  let answer = 0

  for (const row of transposed) {
    const operation = row.at(-1)

    const result = row.reduce((acc, curr) =>
      curr === operation ? acc : calculate(Number(acc), Number(curr), operation)
    )

    answer += result
  }

  return answer
}

export async function partTwo() {
  const input = await getInput()

  const rows = input.length - 1 // removing the operation row
  const columns = input[0].length
  const operations = input.at(-1).split(" ").filter(Boolean)

  let index = 0
  let operands = []
  let answer = 0

  for (let i = 0; i < columns; i++) {
    let number = ""
    for (let j = 0; j < rows; j++) {
      number += input[j][i]
    }

    if (number.trim() === "") {
      const result = operands.reduce((acc, curr) =>
        calculate(Number(acc), Number(curr), operations[index])
      )
      answer += result
      index++
      operands = []
    } else {
      operands.push(number.trim())
    }
  }

  answer += operands.reduce((acc, curr) =>
    calculate(Number(acc), Number(curr), operations[index])
  )

  return answer
}

console.log("Part one answer is:", await partOne())
console.log("Part two answer is:", await partTwo())

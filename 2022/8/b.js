const __dirname = new URL(".", import.meta.url).pathname
const input = await Deno.readTextFile(__dirname + "/input.txt")
const trees = input.split(/\n/).map((line) => line.split("").map(Number))

const scenicScores = []

trees.forEach((row, rowIndex) => {
  row.forEach((tree, columnIndex) => {
    // We can skip rows 0 and length - 1 since they all have a 0 edge. We can also
    // skip columns 0 and length - 1
    if (
      rowIndex === 0 ||
      rowIndex === trees.length - 1 ||
      columnIndex === 0 ||
      columnIndex === row.length - 1
    ) {
      return
    }

    const scoreUp = checkUp(tree, rowIndex, columnIndex)
    const scoreDown = checkDown(tree, rowIndex, columnIndex)
    const scoreLeft = checkLeft(tree, rowIndex, columnIndex)
    const scoreRight = checkRight(tree, rowIndex, columnIndex)

    const score = scoreUp * scoreDown * scoreLeft * scoreRight

    scenicScores.push(score)
  })
})

function checkUp(tree, row, column) {
  let score = 0

  for (let i = row - 1; i >= 0; i--) {
    score++

    if (trees[i][column] >= tree) {
      return score
    }
  }

  return score
}

function checkDown(tree, row, column) {
  let score = 0

  for (let i = row + 1; i < trees.length; i++) {
    score++

    if (trees[i][column] >= tree) {
      return score
    }
  }

  return score
}

function checkRight(tree, row, column) {
  let score = 0

  for (let i = column + 1; i < trees[row].length; i++) {
    score++

    if (trees[row][i] >= tree) {
      return score
    }
  }

  return score
}

function checkLeft(tree, row, column) {
  let score = 0

  for (let i = column - 1; i >= 0; i--) {
    score++

    if (trees[row][i] >= tree) {
      return score
    }
  }

  return score
}

console.log(scenicScores.sort((a, b) => b - a)[0])

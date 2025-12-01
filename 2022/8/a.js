const __dirname = new URL(".", import.meta.url).pathname
const input = await Deno.readTextFile(__dirname + "/input.txt")
const trees = input.split(/\n/).map((line) => line.split("").map(Number))

let visible = 0

trees.forEach((row, rowIndex) => {
  row.forEach((tree, columnIndex) => {
    // We can skip rows 0 and length - 1 since they are all visible. We can also
    // skip columns 0 and length - 1
    if (
      rowIndex === 0 ||
      rowIndex === trees.length - 1 ||
      columnIndex === 0 ||
      columnIndex === row.length - 1
    ) {
      visible++
      return
    }

    if (
      checkUp(tree, rowIndex, columnIndex) ||
      checkDown(tree, rowIndex, columnIndex) ||
      checkLeft(tree, rowIndex, columnIndex) ||
      checkRight(tree, rowIndex, columnIndex)
    ) {
      visible++
    }
  })
})

function checkUp(tree, row, column) {
  for (let i = row - 1; i >= 0; i--) {
    if (trees[i][column] >= tree) {
      return false
    }
  }

  return true
}

function checkDown(tree, row, column) {
  for (let i = row + 1; i < trees.length; i++) {
    if (trees[i][column] >= tree) {
      return false
    }
  }

  return true
}

function checkRight(tree, row, column) {
  for (let i = column + 1; i < trees[row].length; i++) {
    if (trees[row][i] >= tree) {
      return false
    }
  }

  return true
}

function checkLeft(tree, row, column) {
  for (let i = column - 1; i >= 0; i--) {
    if (trees[row][i] >= tree) {
      return false
    }
  }

  return true
}

console.log(visible)

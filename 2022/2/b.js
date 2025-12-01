const __dirname = new URL(".", import.meta.url).pathname
const input = await Deno.readTextFile(__dirname + "/input.txt")
const matches = input.split("\n").map((line) => line.split(" "))

// 1 for Rock, 2 for Paper, and 3 for Scissors
const ROCK = 1
const PAPER = 2
const SCISSORS = 3

// 0 if you lost, 3 if the round was a draw, and 6 if you won
const LOSS = 0
const DRAW = 3
const WIN = 6

const rules = {
  // A for Rock, B for Paper, and C for Scissors
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
}

let score = 0

for (const match of matches) {
  const [player1, result] = match
  const player1Choice = rules[player1]

  // X means you need to lose
  if (result === "X") {
    score += LOSS
    const player2Choice = player1Choice - 1 > 0 ? player1Choice - 1 : 3
    score += player2Choice

    // Y means you need to end the round in a draw
  } else if (result === "Y") {
    score += DRAW
    score += player1Choice

    // Z means you need to win
  } else {
    score += WIN
    const player2Choice = player1Choice + 1 > 3 ? 1 : player1Choice + 1
    score += player2Choice
  }
}

console.log(score)

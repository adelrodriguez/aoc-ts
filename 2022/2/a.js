const __dirname = new URL(".", import.meta.url).pathname
const input = await Deno.readTextFile(__dirname + "/input.txt")
const matches = input.split("\n").map((line) => line.split(" "))

// 1 for Rock, 2 for Paper, and 3 for Scissors
const ROCK = 1
const PAPER = 2
const SCISSORS = 3

const rules = {
  // A for Rock, B for Paper, and C for Scissors
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
  // X for Rock, Y for Paper, and Z for Scissors
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
}

// 0 if you lost, 3 if the round was a draw, and 6 if you won
const LOSS = 0
const DRAW = 3
const WIN = 6

let score = 0

for (const match of matches) {
  const [player1, player2] = match

  const player1Choice = rules[player1]
  const player2Choice = rules[player2]

  if (player2Choice - player1Choice === 0) {
    score += DRAW
  } else if (
    player2Choice - player1Choice === 1 ||
    player2Choice - player1Choice === -2
  ) {
    score += WIN
  } else {
    score += LOSS
  }

  score += player2Choice
}

console.log(score)

const __dirname = new URL(".", import.meta.url).pathname
const input = await Deno.readTextFile(__dirname + "/input.txt")
const pairs = input.split("\n").map((line) => line.split(","))

const positives = []

for (const pair of pairs) {
  const [pairA, pairB] = pair.map((pair) => pair.split("-").map(Number))

  // Does pairA overlap pairB?
  if (
    (pairA[0] >= pairB[0] && pairA[0] <= pairB[1]) ||
    (pairA[1] >= pairB[0] && pairA[1] <= pairB[1])
  ) {
    positives.push(pair)

    // Does pairB overlap pairA?
  } else if (
    (pairB[0] >= pairA[0] && pairB[0] <= pairA[1]) ||
    (pairB[1] >= pairA[0] && pairB[1] <= pairA[1])
  ) {
    positives.push(pair)
  }
}

console.log(positives.length)

const __dirname = new URL(".", import.meta.url).pathname
const input = await Deno.readTextFile(__dirname + "/input.txt")
const pairs = input.split("\n").map((line) => line.split(","))

const positives = []

for (const pair of pairs) {
  const [pairA, pairB] = pair.map((pair) => pair.split("-").map(Number))

  // Is pairA a subset of pairB?
  if (pairA[0] >= pairB[0] && pairA[1] <= pairB[1]) {
    positives.push(pair)

    // Is pairB a subset of pairA?
  } else if (pairA[0] <= pairB[0] && pairA[1] >= pairB[1]) {
    positives.push(pair)
  }
}

console.log(positives.length)

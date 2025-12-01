const __dirname = new URL(".", import.meta.url).pathname
const input = await Deno.readTextFile(__dirname + "/input.txt")
const letters = input.split("")

let found
const packetSize = 14

for (let i = 0; i < letters.length; i++) {
  const set = new Set(letters.slice(i, i + packetSize))

  if (set.size === packetSize) {
    found = i + packetSize
    break
  }
}

console.log(found)

const __dirname = new URL(".", import.meta.url).pathname
const input = await Deno.readTextFile(__dirname + "./input.txt")

const calories = input
  .split("\n\n")
  .map((group) => {
    const values = group.split("\n").map(Number)
    return values.reduce((a, b) => a + b, 0)
  })
  .sort((a, b) => b - a)

console.log(calories[0])

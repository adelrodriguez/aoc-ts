const __dirname = new URL(".", import.meta.url).pathname
const input = await Deno.readTextFile(__dirname + "/input.txt")
const rucksacks = input.split("\n")

const allErrors = []
const values = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]

for (const rucksack of rucksacks) {
  const length = rucksack.length
  const middle = Math.floor(length / 2)
  const compartmentA = rucksack.slice(0, middle)
  const compartmentB = rucksack.slice(middle, length)

  const errors = []

  compartmentA.split("").forEach((item) => {
    if (compartmentB.includes(item) && !errors.includes(item)) {
      errors.push(item)
    }
  })

  allErrors.push(errors)
}

const total = allErrors.reduce((acc, errors) => {
  errors.forEach((error) => {
    acc += values.indexOf(error) + 1
  })

  return acc
}, 0)

console.log(total)

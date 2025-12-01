const __dirname = new URL(".", import.meta.url).pathname
const input = await Deno.readTextFile(__dirname + "/input.txt")
const rucksacks = input.split("\n")

const allBadges = []
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

for (let i = 0; i < rucksacks.length; i += 3) {
  const rucksack1 = rucksacks[i]
  const rucksack2 = rucksacks[i + 1]
  const rucksack3 = rucksacks[i + 2]
  const badges = []

  rucksack1.split("").forEach((item) => {
    if (
      rucksack2.includes(item) &&
      rucksack3.includes(item) &&
      !badges.includes(item)
    ) {
      badges.push(item)
    }
  })

  allBadges.push(badges)
}

const total = allBadges.reduce((acc, badges) => {
  badges.forEach((error) => {
    acc += values.indexOf(error) + 1
  })

  return acc
}, 0)

console.log(total)

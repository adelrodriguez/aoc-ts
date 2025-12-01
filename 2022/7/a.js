const __dirname = new URL(".", import.meta.url).pathname
const input = await Deno.readTextFile(__dirname + "/input.txt")
const commands = input.split(/\n/).map((line) => line.split(" "))

const paths = []
const tree = {}
// Adding them to an array since there might be more than one directory with the
// same name. I struggled with this for a while.
const sizes = []

for (const line of commands) {
  if (line[0] === "$") {
    if (line[1] === "cd") {
      if (line[2] === "..") {
        paths.pop()
      } else if (line[2] === "/") {
        paths.length = 0
      } else {
        paths.push(line[2])
      }
    }
  } else {
    insert(line[1], line[0] === "dir" ? {} : +line[0])
  }
}

// Find all of the directories sizes
function explore(obj) {
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      const size = getSize(obj[key])

      if (size <= 100_000) {
        sizes.push(size)
      }

      explore(obj[key])
    }
  }
}

function insert(path, value) {
  let current = tree

  for (const path of paths) {
    if (!current[path]) {
      current[path] = {}
    }

    current = current[path]
  }

  current[path] = value
}

function getSize(obj) {
  // initialize sum to 0
  let sum = 0

  // iterate over the properties of the given object
  for (const key in obj) {
    // check if the property value is an object
    if (typeof obj[key] === "object") {
      // if so, recursively calculate the sum of its nested properties
      sum += getSize(obj[key])
    } else {
      // otherwise, add the property value to the sum
      sum += obj[key]
    }
  }

  // return the calculated sum
  return sum
}

explore(tree)

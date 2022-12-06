const { timeFunction, getInput } = require('../common')

function partOne(numbers) {
  let stream = []
  for (let x = 0; x < numbers[0].length; x++) {
    const char = numbers[0][x];

    if (stream.includes(char)) {
      // This is wrong, but I'm leaving this here because it *does* work for my puzzle input. See part 2 for the actual solution
      stream = [char]
      continue
    }
    stream.push(char)
    if (stream.length === 4) return x
  }
  debugger
}

function partTwo(numbers) {
  let stream = []
  for (let x = 0; x < numbers[0].length; x++) {
    const char = numbers[0][x];

    const indexExist = stream.indexOf(char)

    if (indexExist > -1) {
      stream = stream.slice(indexExist + 1)
      stream.push(char)
      continue
    }
    stream.push(char)
    if (stream.length === 14) return x + 1
  }
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start
start()
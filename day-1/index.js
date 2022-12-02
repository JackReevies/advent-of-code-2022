const { timeFunction, getInput } = require('../common')

function getElves(numbers) {
  const elves = []
  let currentElf = 0
  for (const line of numbers) {
    if (line === '') {
      elves.push(currentElf)
      currentElf = 0
      continue
    }
    currentElf += Number(line) || 0
  }
  elves.push(currentElf)
  return elves
}


function partOne(elves) {
  return Math.max(...elves)
}

function partTwo(elves) {
  elves.sort((a, b) => a < b ? 1 : -1)
  const slice = elves.slice(0, 3)
  return slice.reduce((acc, obj) => acc + obj, 0)
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)
  const elves = getElves(numbers)

  const task1 = await timeFunction(() => partOne(elves))
  const task2 = await timeFunction(() => partTwo(elves))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start
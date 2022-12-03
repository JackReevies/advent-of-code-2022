const { timeFunction, getInput } = require('../common')

function getElves(numbers) {

}


function partOne(elves) {
  return Math.max(...elves)
}

function partTwo(elves) {

}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start
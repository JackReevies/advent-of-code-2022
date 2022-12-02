const { timeFunction, getInput } = require('../common')

function partOne(pairs) {
  let score = 0
  for (const pair of pairs) {
    const throws = pair.split(' ')
    score += throws[1] === 'X' ? 1 : throws[1] === 'Y' ? 2 : 3
    let roundScore = 0
    if (throws[1] === 'X') {
      roundScore = throws[0] === 'A' ? 3 : throws[0] === 'B' ? 0 : 6
    } else if (throws[1] === 'Y') {
      roundScore = throws[0] === 'A' ? 6 : throws[0] === 'B' ? 3 : 0
    } else if (throws[1] === 'Z') {
      roundScore = throws[0] === 'A' ? 0 : throws[0] === 'B' ? 6 : 3
    } else {
      throw new Error(`Unknown Throw ${throws[1]}`)
    }
    score += roundScore
  }
  return score
}

function partTwo(pairs) {
  let score = 0
  for (const pair of pairs) {
    const throws = pair.split(' ')
    const opponent = throws[0]
    const matchResult = throws[1]
    let myThrow = ''

    if (opponent === 'A') {
      myThrow = matchResult === 'X' ? 'C' : matchResult === 'Z' ? 'B' : opponent
    } else if (opponent === 'B') {
      myThrow = matchResult === 'X' ? 'A' : matchResult === 'Z' ? 'C' : opponent
    } else if (opponent === 'C') {
      myThrow = matchResult === 'X' ? 'B' : matchResult === 'Z' ? 'A' : opponent
    } else {
      throw new Error(opponent)
    }

    score += myThrow === 'A' ? 1 : myThrow === 'B' ? 2 : 3
    score += matchResult === 'Z' ? 6 : matchResult === 'Y' ? 3 : 0
  }
  return score
}

async function start() {
  const lines = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(lines))
  const task2 = await timeFunction(() => partTwo(lines))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start

start()
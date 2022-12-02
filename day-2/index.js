const { timeFunction, getInput, getInputAsString } = require('../common')

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

function betterP1(lines) {
  let score = 0
  for (const line of lines) {
    const p1 = Number(line[0])
    const p2 = Number(line[2])

    score += p2
    score += p1 === p2 ? 3 : (p1 === 1 && p2 === 3 || p1 === 2 && p2 === 1 || p1 === 3 && p2 === 2) ? 0 : 6
  }

  return score
}

function betterP2(lines) {
  const win = (op) => op === 1 ? 2 : op === 2 ? 3 : 1
  const lose = (op) => op === 1 ? 3 : op === 2 ? 1 : 2

  let score = 0
  for (const line of lines) {
    const p1 = Number(line[0])
    const res = Number(line[2])
    const p2 = res === 2 ? p1 : res === 3 ? win(p1) : lose(p1)

    score += p2
    score += (res - 1) * 3
  }

  return score
}

const lose = (num) => num - 1 || 3
const win = (num) => num === 3 ? 1 : num + 1

function evenBetterP1(lines) {
  return lines.reduce((acc, line) => {
    const p1 = Number(line[0])
    const p2 = Number(line[2])
    return acc + p2 + (lose(p1) === p2 ? 0 : p1 === p2 ? 3 : 6)
  }, 0)
}

function evenBetterP2(lines) {
  return lines.reduce((acc, line) => {
    const p1 = Number(line[0])
    const res = Number(line[2])
    const p2 = res === 2 ? p1 : res === 3 ? win(p1) : lose(p1)
    return acc + p2 + (res - 1) * 3
  }, 0)
}

async function start() {
  const lines = getInputAsString(`${__dirname}/input.txt`).replace(/A|X/g, 1).replace(/B|Y/g, 2).replace(/C|Z/g, 3).split(/\n|\r\n/)

  const task1 = await timeFunction(() => evenBetterP1(lines))
  const task2 = await timeFunction(() => evenBetterP2(lines))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start

start()
const { timeFunction, getInput } = require('../common')

function getElves(numbers) {

}

function createArray(start, end) {
  let arr = []
  for (let i = start; i < end + 1; i++) {
    arr.push(i)
  }
  return arr
}

function partOne(elves) {
  let score = 0
  for (const line of elves) {
    const regex = /(\d+)-(\d+),(\d+)-(\d+)/.exec(line)
    const oneStart = Number(regex[1])
    const oneEnd = Number(regex[2])
    const twoStart = Number(regex[3])
    const twoEnd = Number(regex[4])

    const one = createArray(oneStart, oneEnd)
    const two = createArray(twoStart, twoEnd)
    const oneUnique = []
    const twoUnique = []

    two.forEach(o => {
      if (!one.includes(o)) {
        twoUnique.push(o)
      }
    })

    one.forEach(o => {
      if (!two.includes(o)) {
        oneUnique.push(o)
      }
    })

    if (oneUnique.length && twoUnique.length) {
      score++
    }

  }

  return 1000 - score
}

function partTwo(lines) {
  let score = 0
  for (const line of lines) {
    const regex = /(\d+)-(\d+),(\d+)-(\d+)/.exec(line)
    const oneStart = Number(regex[1])
    const oneEnd = Number(regex[2])
    const twoStart = Number(regex[3])
    const twoEnd = Number(regex[4])

    const one = createArray(oneStart, oneEnd)
    const two = createArray(twoStart, twoEnd)
    const common = []

    two.forEach(o => {
      if (one.includes(o)) {
        common.push(o)
      }
    })

    if (common.length) {
      score++
    }
  }

  return score
}

function betterP1(lines) {
  let score = 0
  for (const line of lines) {
    const regex = /(\d+)-(\d+),(\d+)-(\d+)/.exec(line)
    const oneStart = Number(regex[1])
    const oneEnd = Number(regex[2])
    const twoStart = Number(regex[3])
    const twoEnd = Number(regex[4])

    // For one to be contained within two
    if (oneStart >= twoStart && oneEnd <= twoEnd) {
      score++
    } else if (twoStart >= oneStart && twoEnd <= oneEnd) {
      score++
    }
  }
  return score
}

function betterP2(lines) {
  let score = 0
  for (const line of lines) {
    const regex = /(\d+)-(\d+),(\d+)-(\d+)/.exec(line)
    const oneStart = Number(regex[1])
    const oneEnd = Number(regex[2])
    const twoStart = Number(regex[3])
    const twoEnd = Number(regex[4])

    // For one to be overallped with two
    // 6-6,4-7
    if (oneStart >= twoStart && oneStart <= twoEnd) {
      score++
      // 2-6,4-8
    } else if (oneEnd >= twoStart && oneEnd <= twoEnd) {
      score++
      //2-93. 4-92
    } else if (oneEnd >= twoStart && oneStart <= twoStart) {
      score++
    }
    else {
      //debugger
    }
  }
  return score
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => betterP1(numbers))
  const task2 = await timeFunction(() => betterP2(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start

start()
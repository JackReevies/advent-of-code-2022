const { writeFileSync } = require('fs')
const { timeFunction, getInput } = require('../common')

function partOne(numbers) {
  let cycle = 1
  let x = 1
  let lastX = 0
  let res20 = null
  let res60 = null
  let res100 = null
  let res140 = null
  let res180 = null
  let res220 = null

  for (let i = 0; i < numbers.length; i++) {
    const line = numbers[i];

    if (res20 === null && cycle >= 20) {
      if (cycle > 20) {
        res20 = 20 * (x - (x - lastX))
      } else
        res20 = 20 * x
    }

    if (res60 === null && cycle >= 60) {
      if (cycle > 60) {
        res60 = 60 * (x - (x - lastX))
      } else
        res60 = 60 * x
    }

    if (res100 === null && cycle >= 100) {
      if (cycle > 100) {
        res100 = 100 * (x - (x - lastX))
      } else
        res100 = 100 * x
    }

    if (res140 === null && cycle >= 140) {
      if (cycle > 140) {
        res140 = 140 * (x - (x - lastX))
      } else
        res140 = 140 * x
    }

    if (res180 === null && cycle >= 180) {
      if (cycle > 180) {
        res180 = 180 * (x - (x - lastX))
      } else
        res180 = 180 * x
    }

    if (res220 === null && cycle >= 220) {
      if (cycle > 220) {
        res220 = 220 * (x - (x - lastX))
      } else
        res220 = 220 * x
    }

    if (line.startsWith("noop")) {
      cycle++
      continue
    }

    if (line.startsWith("addx")) {
      const val = Number(line.replace("addx ", ""))
      if (val === NaN) {
        throw new Error()
      }
      lastX = x
      x += val
      cycle += 2
    }

  }

  return res20 + res60 + res100 + res140 + res180 + res220
}

function partTwo(numbers) {
  let cycle = 1
  let x = 1
  let cycles = []

  for (let i = 0; i < numbers.length; i++) {
    const line = numbers[i];

    if (line.startsWith("noop")) {
      cycles[cycle] = { op: line, x: x, cycle: cycle, line: i }
      cycle++
    } else {
      const val = Number(line.replace("addx ", ""))
      if (val === NaN) {
        throw new Error()
      }
      cycles[cycle] = { op: line, x: x, cycle: cycle, line: i }
      cycles[cycle + 1] = { op: line, x: x, cycle: cycle + 1, line: i }
      cycle += 2
      x = x + val
    }
  }

  let crtState = Array(6).fill(0).map(o => Array(40).fill('.'))
  for (let i = 1; i < cycles.length - 1; i++) {
    const cycle = cycles[i];

    const spritePos = Array(40).fill('.')
    spritePos[cycle.x] = '#'
    spritePos[cycle.x - 1] = '#'
    spritePos[cycle.x + 1] = '#'

    const y = Math.floor(cycle.cycle / 40)
    const x = cycle.cycle % 40

    crtState[y][x - 1] = spritePos[x - 1]

    //console.log(cycle.cycle)
    //console.log(crtState.map(o => o.join("")).join("\r\n"))
  }

  //console.log(crtState.map(o => o.join(" ")).join("\r\n"))
  //console.log(require('./extra').interpretDisplay(crtState))
  const answer = [["#", "#", "#", ".", ".", "#", "#", "#", "#", ".", "#", "#", "#", "#", ".", "#", ".", ".", "#", ".", "#", "#", "#", "#", ".", "#", "#", "#", "#", ".", "#", ".", ".", "#", ".", ".", "#", "#", ".", "."], ["#", ".", ".", "#", ".", ".", ".", ".", "#", ".", "#", ".", ".", ".", ".", "#", ".", "#", ".", ".", "#", ".", ".", ".", ".", "#", ".", ".", ".", ".", "#", ".", ".", "#", ".", "#", ".", ".", "#", "."], ["#", ".", ".", "#", ".", ".", ".", "#", ".", ".", "#", "#", "#", ".", ".", "#", "#", ".", ".", ".", "#", "#", "#", ".", ".", "#", "#", "#", ".", ".", "#", "#", "#", "#", ".", "#", ".", ".", "#", "."], ["#", "#", "#", ".", ".", ".", "#", ".", ".", ".", "#", ".", ".", ".", ".", "#", ".", "#", ".", ".", "#", ".", ".", ".", ".", "#", ".", ".", ".", ".", "#", ".", ".", "#", ".", "#", "#", "#", "#", "."], ["#", ".", "#", ".", ".", "#", ".", ".", ".", ".", "#", ".", ".", ".", ".", "#", ".", "#", ".", ".", "#", ".", ".", ".", ".", "#", ".", ".", ".", ".", "#", ".", ".", "#", ".", "#", ".", ".", "#", "."], ["#", ".", ".", "#", ".", "#", "#", "#", "#", ".", "#", "#", "#", "#", ".", "#", ".", ".", "#", ".", "#", "#", "#", "#", ".", "#", ".", ".", ".", ".", "#", ".", ".", "#", ".", "#", ".", ".", "#", "."]]
  if (JSON.stringify(answer) === JSON.stringify(crtState)) {
    return 'RZEKEFHA'
  }
  return 'FAILED!'
}


async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start


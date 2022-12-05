const { timeFunction, getInput } = require('../common')

function getStacks(lines) {
  let stacks = [[], [], [], [], [], [], [], [], []]
  for (const line of lines) {
    for (let i = 1; i < line.length; i += 4) {
      const crate = line[i]
      if (crate === ' ') continue
      if (!line.includes(`[${crate}]`)) continue
      const stackIndex = Math.floor(i / 4)
      stacks[stackIndex].push(crate)
    }
  }
  return stacks
}

function getInstructions(lines) {
  return lines.slice(lines.findIndex(o => o.startsWith("move")))
}

function partOne(stacks, instructions) {
  for (const instruction of instructions) {
    const [_, x, from, to] = /move (\d+) from (\d+) to (\d+)/.exec(instruction)

    for (let i = 0; i < x; i++) {
      stacks[to - 1].splice(0, 0, stacks[from - 1][0])
      stacks[from - 1].splice(0, 1)
    }
  }

  return stacks.map(o => o[0]).join('')
}

function partTwo(stacks, instructions) {
  for (const instruction of instructions) {
    const [_, x, from, to] = /move (\d+) from (\d+) to (\d+)/.exec(instruction)

    stacks[to - 1].splice(0, 0, ...stacks[from - 1].slice(0, x))
    stacks[from - 1].splice(0, x)

  }

  return stacks.map(o => o[0]).join('')
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const stacks = getStacks(numbers)
  const instructions = getInstructions(numbers)

  const task1 = await timeFunction(() => partOne(stacks.map(o => o.slice()), instructions))
  const task2 = await timeFunction(() => partTwo(stacks, instructions))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start
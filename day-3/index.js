const { timeFunction, getInput } = require('../common')

function getElves(numbers) {

}


function partOne(lines) {
  console.log("pLPvt")
  let score = 0
  for (const line of lines) {
    const nums = line.split('').map(o => {
      const code = o.charCodeAt(0)
      return o.toUpperCase() === o ? code - 38 : code - 96
    })

    const rucksacks = [nums.slice(0, nums.length / 2), nums.slice(nums.length / 2, nums.length)]
    rucksacks[0].sort((a, b) => a < b ? -1 : 1)
    rucksacks[1].sort((a, b) => a < b ? -1 : 1)

    const common = rucksacks[0].find(o => rucksacks[1].includes(o))
    console.log(common)
    score += common
  }

  return score
}

function partTwo(lines) {
  let score = 0
  const sacks = [] // {1: array, 2: array, common: number, badge: number}
  for (const line of lines) {
    const nums = line.split('').map(o => {
      const code = o.charCodeAt(0)
      return o.toUpperCase() === o ? code - 38 : code - 96
    })

    const rucksacks = [nums.slice(0, nums.length / 2), nums.slice(nums.length / 2, nums.length)]
    rucksacks[0].sort((a, b) => a < b ? -1 : 1)
    rucksacks[1].sort((a, b) => a < b ? -1 : 1)

    const common = rucksacks[0].find(o => rucksacks[1].includes(o))
    console.log(common)
    score += common
    sacks.push({ nums, common })
  }

  score = 0
  for (let i = 0; i < sacks.length; i += 3) {
    const sack = sacks[i];

    const group = sacks.slice(i, i + 3)
    console.log(1)

    const common = group[0].nums.find(o => group[1].nums.includes(o) && group[2].nums.includes(o))
    console.log(common)
    score += common
  }

  return score
}

function betterP1(sacks) {
  return sacks.reduce((acc, obj) => {
    const parts = [obj.slice(0, obj.length / 2), obj.slice(obj.length / 2, obj.length)]
    const common = parts[0].find(o => parts[1].includes(o))
    return acc + common
  }, 0)
}

function betterP2(sacks) {
  let score = 0
  for (let i = 0; i < sacks.length; i += 3) {
    const group = sacks.slice(i, i + 3)
    const common = group[0].find(o => group[1].includes(o) && group[2].includes(o))
    score += common
  }
  return score
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`).map(o => o.split('').map(o => {
    const code = o.charCodeAt(0)
    return o.toUpperCase() === o ? code - 38 : code - 96
  }))

  const task1 = await timeFunction(() => betterP1(numbers))
  const task2 = await timeFunction(() => betterP2(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start
const { timeFunction, getInput, getInputAsString, timeFn } = require('../common')

function getByMonkey(str) {
  let monkeys = []

  str.split('\n\n').forEach(o => {
    const regex = /Monkey (\d+):\n\s+Starting items: ([\d, ]+)\n\s+Operation: new = (.+)\n\s+Test: divisible by (\d+)\n\s+If true: throw to monkey (\d+)\n\s+If false: throw to monkey (\d)/g.exec(o)

    monkeys.push({
      num: regex[1],
      items: regex[2].split(', ').map(o => Number(o)),
      operation: regex[3],
      test: Number(regex[4]),
      ifTrue: regex[5],
      ifFalse: regex[6],
      perRoundItems: [regex[2].split(', ')],
      inspectCount: 0
    })
  })

  return monkeys
}

function doIteration(monkeys) {
  for (let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i];

    while (monkey.items.length) {
      const item = monkey.items.splice(0, 1)[0]

      const preInspectionWorry = eval(monkey.operation.replace(/old/g, item))
      const postInspectionWorry = Math.floor(preInspectionWorry / 3)
      monkey.inspectCount++

      if (postInspectionWorry % monkey.test === 0) {
        // throw to monkey in ifTrue
        monkeys.find(o => o.num === monkey.ifTrue).items.push(postInspectionWorry)
      } else {
        // throw to monkey in ifFalse
        monkeys.find(o => o.num === monkey.ifFalse).items.push(postInspectionWorry)
      }
      //debugger
    }
  }
}

function partOne(monkeys) {
  for (let i = 0; i < 20; i++) {
    doIteration(monkeys)
  }
  monkeys.sort((a, b) => a.inspectCount > b.inspectCount ? -1 : 1)
  return monkeys[0].inspectCount * monkeys[1].inspectCount
}

function doIterationTwo(monkeys) {
  const maxNumber = monkeys.reduce((acc, obj) => acc * obj.test, 1)
  for (let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i];

    while (monkey.items.length) {
      const item = monkey.items.splice(0, 1)[0]

      const op = monkey.operation.replace(/old/g, item)
      let worry = eval(op)
      worry = worry % maxNumber

      monkey.inspectCount++

      const result = worry % monkey.test

      if (result === 0) {
        monkeys.find(o => o.num === monkey.ifTrue).items.push(worry)
      } else {
        monkeys.find(o => o.num === monkey.ifFalse).items.push(worry)
      }
    }
  }
}

function partTwo(monkeys) {
  for (let i = 1; i < 10001; i++) {
    doIterationTwo(monkeys)
  }
  monkeys.sort((a, b) => a.inspectCount > b.inspectCount ? -1 : 1)
  return monkeys[0].inspectCount * monkeys[1].inspectCount
}

async function start() {
  const numbers = getInputAsString(`${__dirname}/input.txt`)
  const monkeys = getByMonkey(numbers)

  const task1 = await timeFunction(() => partOne(monkeys.map(o => { return { ...o, items: o.items.slice() } })))
  const task2 = await timeFunction(() => partTwo(monkeys))
  console.log(task2)
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start
start()
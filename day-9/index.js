const { exec } = require('child_process');
const { timeFunction, getInput } = require('../common')

function partOne(lines) {
  const grid = [[]]
  const headGrid = [[]]
  const tailGrid = [[]]
  let x = 0
  let y = 0
  let head = { x: 0, y: 0 }
  let tail = { x: 0, y: 0 }
  let prevDirection = null
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const [_, direction, amount] = /(.) (\d+)/.exec(line)

    for (let z = 0; z < Number(amount); z++) {
      if (direction === 'R') {
        head.x++
        tail.x = head.x - 1
      } else if (direction === 'L') {
        head.x--
        if (!z && prevDirection === 'U') {
          tail.y--
          tail.x--
        } else if (!z && prevDirection === 'D') {
          tail.y++
          tail.x--
        }

        tail.x = head.x + 1
      } else if (direction === 'U') {
        head.y--

        if (!z && prevDirection === 'R') {
          tail.x++
          tail.y--
        } else if (!z && prevDirection === 'L') {
          tail.x--
          tail.y--
        }

        tail.y = head.y + 1
      } else if (direction === 'D') {
        head.y++


      }

      headGrid[head.y][head.x] = 'X'
    }

    prevDirection = direction
  }
}

function partOne(lines) {
  const headGrid = [[]]
  const tailGrid = [[]]
  let smallestY = 0
  let smallestX = 0
  let unique = 0
  let head = { x: 0, y: 0 }
  let tail = { x: 0, y: 0 }
  let prevDirection = null
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const [_, direction, amount] = /(.) (\d+)/.exec(line)

    for (let x = 0; x < Number(amount); x++) {
      if (direction === 'R') {
        head.x++
      } else if (direction === 'L') {
        head.x--
      } else if (direction === 'U') {
        head.y--
      } else if (direction === 'D') {
        head.y++
      } else {
        throw new Error()
      }

      // Now catch up tail - should always be one behind
      if (Math.abs(head.x - tail.x) > 1) {
        tail.x += direction === 'R' ? 1 : -1
        // If we're adjust x then y should be the same
        tail.y = head.y
      }

      if (Math.abs(head.y - tail.y) > 1) {
        tail.y += direction === 'D' ? 1 : -1
        // If we're adjust y then x should be the same
        tail.x = head.x
      }

      if (!tailGrid[tail.y]) {
        tailGrid[tail.y] = []
      }

      if (tailGrid[tail.y][tail.x] !== 'X') {
        tailGrid[tail.y][tail.x] = 'X'
        unique++
      }
    }
  }

  return unique
}

function partOne(lines) {
  const headGrid = [[]]
  const tailGrid = [[]]
  let smallestY = 0
  let smallestX = 0
  let unique = 0
  let head = { x: 0, y: 0 }
  let tail = { x: 0, y: 0 }
  let prevDirection = null
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const [_, direction, amount] = /(.) (\d+)/.exec(line)

    for (let x = 0; x < Number(amount); x++) {
      if (direction === 'R') {
        head.x++
      } else if (direction === 'L') {
        head.x--
      } else if (direction === 'U') {
        head.y--
      } else if (direction === 'D') {
        head.y++
      } else {
        throw new Error()
      }

      //A When both X and Y change and one is more than 2. update both
      //B When either X or Y is more than 1. only update the one thats bigger
      //C When neither X or Y is more than 1. Do nothing

      const xDiff = Math.abs(head.x - tail.x)
      const yDiff = Math.abs(head.y - tail.y)

      if (xDiff > 1 && yDiff === 0) {
        // B: Update X
        tail.x += head.x > tail.x ? 1 : -1
      }
      else if (yDiff > 1 && xDiff === 0) {
        // B: Update Y
        tail.y += head.y > tail.y ? 1 : -1
      }
      else if (xDiff > 1 || yDiff > 1) {
        // A: Update both
        tail.x += head.x > tail.x ? 1 : -1
        tail.y += head.y > tail.y ? 1 : -1
      }

      if (!tailGrid[tail.y]) {
        tailGrid[tail.y] = []
      }

      if (tailGrid[tail.y][tail.x] !== 'X') {
        tailGrid[tail.y][tail.x] = 'X'
        unique++
      }
    }
  }

  return unique
}

function isAngleChange(direction, prevDirection) {
  const obj = {
    'U': ['L', 'R'],
    'D': ['L', 'R'],
    'L': ['U', 'D'],
    'R': ['U', 'D']
  }
  return obj[direction].includes(prevDirection)
}

function partTwo(lines) {
  const headGrid = [[]]
  const tailGrid = [[]]
  let smallestY = 0
  let smallestX = 0
  let unique = 0
  let knots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(o => { return { x: 0, y: 0, touched: [], unique: 0, lastMove: { x: 0, y: 0 } } })
  let head = knots[0]
  let prevDirection = null
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    console.log(`== ${line} ==`)

    const [_, direction, amount] = /(.) (\d+)/.exec(line)

    for (let x = 0; x < Number(amount); x++) {
      if (direction === 'R') {
        head.x++
      } else if (direction === 'L') {
        head.x--
      } else if (direction === 'U') {
        head.y--
      } else if (direction === 'D') {
        head.y++
      } else {
        throw new Error()
      }

      // When both X and Y change and one is more than 2. update both
      // When either X or Y is more than 1. only update the one thats bigger
      // When neither X or Y is more than 1. Do nothing



      for (let z = 1; z < knots.length; z++) {
        const knot = knots[z];
        const prevKnot = knots[z - 1]

        if (line === "U 8" && x === 7 && z === 6) {
          debugBoardState(knots)
        }

        let didXUpdate = false
        // Now catch up tail - should always be one behind
        if (Math.abs(prevKnot.x - knot.x) > 1) {
          didXUpdate = true
          const prevX = knot.x
          knot.x = prevKnot.x > knot.x ? prevKnot.x - 1 : prevKnot.x + 1
          knot.lastMove.x = knot.x - prevX
          // If we're adjust x then y should be the same
          const prevY = knot.y
          if (knot.y !== prevKnot.y) {
            knot.y = prevKnot.y > knot.y ? prevKnot.y - 1 : prevKnot.y + 1
          }
          knot.lastMove.y = knot.y - prevY
        }

        if (Math.abs(prevKnot.y - knot.y) > 1) {
          const prevY = knot.y
          knot.y = prevKnot.y > knot.y ? prevKnot.y - 1 : prevKnot.y + 1
          knot.lastMove.y = knot.y - prevY
          // If we're adjust y then x should be the same
          const prevX = knot.x
          if (knot.x !== prevKnot.x) {
            knot.x = prevKnot.x > knot.x ? prevKnot.x - 1 : prevKnot.x + 1
          }
          knot.lastMove.x = knot.x - prevX
        }

        if (!knot.touched[knot.y]) {
          knot.touched[knot.y] = []
        }

        if (knot.touched[knot.y][knot.x] !== 'X') {
          knot.touched[knot.y][knot.x] = 'X'
          knot.unique++
        }
      }
      debugBoardState(knots)
      prevDirection = direction
    }
  }

  return unique
}

function partTwo(lines) {

  let knots = Array(100).fill(0).map(o => { return { x: 0, y: 0, touched: [], unique: 0, lastMove: { x: 0, y: 0 } } })
  let head = knots[0]
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    //console.log(`== ${line} ==`)

    const [_, direction, amount] = /(.) (\d+)/.exec(line)

    for (let x = 0; x < Number(amount); x++) {
      if (direction === 'R') {
        head.x++
      } else if (direction === 'L') {
        head.x--
      } else if (direction === 'U') {
        head.y--
      } else if (direction === 'D') {
        head.y++
      } else {
        throw new Error()
      }

      for (let z = 1; z < knots.length; z++) {
        const knot = knots[z];
        const prevKnot = knots[z - 1]

        //A When both X and Y change and one is more than 2. update both
        //B When either X or Y is more than 1. only update the one thats bigger
        //C When neither X or Y is more than 1. Do nothing

        const xDiff = Math.abs(prevKnot.x - knot.x)
        const yDiff = Math.abs(prevKnot.y - knot.y)

        if (xDiff > 1 && yDiff === 0) {
          // B: Update X
          knot.x += prevKnot.x > knot.x ? 1 : -1
        }
        else if (yDiff > 1 && xDiff === 0) {
          // B: Update Y
          knot.y += prevKnot.y > knot.y ? 1 : -1
        }
        else if (xDiff > 1 || yDiff > 1) {
          // A: Update both
          knot.x += prevKnot.x > knot.x ? 1 : -1
          knot.y += prevKnot.y > knot.y ? 1 : -1
        }

        if (!knot.touched[knot.y]) {
          knot.touched[knot.y] = []
        }

        if (knot.touched[knot.y][knot.x] !== 'X') {
          knot.touched[knot.y][knot.x] = 'X'
          knot.unique++
        }
      }
      
      prevDirection = direction
    }
    //debugBoardState(knots)
  }

  return knots[9].unique
}


function debugBoardState(knots) {
  let range = 20
  // let grid = []
  // for (let y = -range; y < range; y++) {
  //   if (!grid[y]) {
  //     grid[y] = []
  //   }

  //   for (let x = -range; x < range; x++) {

  //     for (let z = 0; z < knots.length; z++) {
  //       const knot = knots[z];
  //       if (knot.x === x && knot.y === y) {
  //         grid[y][x] = z
  //         break
  //       }
  //     }

  //     if (!grid[y][x]) {
  //       grid[y][x] = '.'
  //     }
  //   }
  // }

  let board = ''

  for (let y = -range; y < range; y++) {
    for (let x = -range; x < range; x++) {
      let char = '.'
      for (let z = 0; z < knots.length; z++) {
        const knot = knots[z];
        if (knot.x === x && knot.y === y) {
          char = z
          break
        }
      }
      board += char
    }
    board += '\r\n'
  }

  console.log(board)
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start
start()
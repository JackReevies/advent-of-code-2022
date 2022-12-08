const { timeFunction, getInput } = require('../common')

function partOne(grid) {
  let visibleTrees = []

  //console.log(isTreeVisibleFromBottom(3, 2, grid))

  let score = 0
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];

    for (let x = 0; x < row.length; x++) {
      const tree = row[x];

      if (!y | !x) {
        score++
        continue
      }

      // Is tree visible from top, left, right, bottom
      if (isTreeVisibleFromBottom(y, x, grid) || isTreeVisibleFromLeft(y, x, grid) || isTreeVisibleFromRight(y, x, grid) || isTreeVisibleFromTop(y, x, grid)) {
        score++
      }

    }
  }

  return score
}

function isTreeVisibleFromLeft(y, x, grid) {
  for (let i = 0; i < x; i++) {
    if (grid[y][x] <= grid[y][i]) {
      return false
    }
  }
  //console.log(`Tree at (${x}, ${y}) ${grid[y][x]} is visible from Left`)
  return true
}

function isTreeVisibleFromRight(y, x, grid) {
  const ourTree = grid[y][x]
  for (let i = grid[0].length - 1; i > x; i--) {
    const testTree = grid[y][i]
    if (ourTree <= testTree) {
      return false
    }
  }
  //console.log(`Tree at (${x}, ${y}) ${grid[y][x]} is visible from Right`)
  return true
}

function isTreeVisibleFromTop(y, x, grid) {
  const ourTree = grid[y][x]
  for (let i = 0; i < y; i++) {
    const testTree = grid[i][x]
    if (ourTree <= testTree) {
      return false
    }
  }
  //console.log(`Tree at (${x}, ${y}) ${grid[y][x]} is visible from Top`)
  return true
}

function isTreeVisibleFromBottom(y, x, grid) {
  const ourTree = grid[y][x]
  for (let i = grid.length - 1; i > y; i--) {
    const testTree = grid[i][x]
    if (ourTree <= testTree) {
      return false
    }
  }
  //console.log(`Tree at (${x}, ${y}) ${grid[y][x]} is visible from Bottom`)
  return true
}

function getTreesVisibleUp(y, x, grid) {
  let score = 0
  const ourTree = grid[y][x]
  for (let i = y - 1; i >= 0; i--) {
    const testTree = grid[i][x]
    score++
    if (ourTree <= testTree) {
      break
    }
  }
  //console.log(`Tree at (${x}, ${y}) ${grid[y][x]} can see ${score} trees looking up`)
  return score
}

function getTreesVisibleDown(y, x, grid) {
  let score = 0
  const ourTree = grid[y][x]
  for (let i = y + 1; i < grid.length; i++) {
    const testTree = grid[i][x]
    score++
    if (ourTree <= testTree) {
      break
    }
  }
  //console.log(`Tree at (${x}, ${y}) ${grid[y][x]} can see ${score} trees looking down`)
  return score
}

function getTreesVisibleLeft(y, x, grid) {
  let score = 0
  const ourTree = grid[y][x]
  for (let i = x - 1; i >= 0; i--) {
    const testTree = grid[y][i]
    score++
    if (ourTree <= testTree) {
      break
    }
  }
  //console.log(`Tree at (${x}, ${y}) ${grid[y][x]} can see ${score} trees looking left`)
  return score
}

function getTreesVisibleRight(y, x, grid) {
  let score = 0
  const ourTree = grid[y][x]
  for (let i = x + 1; i < grid[0].length; i++) {
    const testTree = grid[y][i]
    score++
    if (ourTree <= testTree) {
      break
    }
  }
  //console.log(`Tree at (${x}, ${y}) ${grid[y][x]} can see ${score} trees looking right`)
  return score
}


function getTree(y, x, grid) {
  return grid[y][x]
}

function partTwo(grid) {
  let visibleTrees = []
  let maxScore = 0
  //console.log(isTreeVisibleFromBottom(3, 2, grid))

  getTreesVisibleDown(1, 2, grid)
  getTreesVisibleUp(1, 2, grid)
  getTreesVisibleLeft(1, 2, grid)
  getTreesVisibleRight(1, 2, grid)

  let score = 0
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];

    for (let x = 0; x < row.length; x++) {
      const tree = row[x];

      // Its probably a safe bet to say it wont be a tree on the edge
      if (!y | !x) {
        continue
      }

      let treeScore = getTreesVisibleDown(y, x, grid) * getTreesVisibleLeft(y, x, grid) * getTreesVisibleRight(y, x, grid) * getTreesVisibleUp(y, x, grid)
      //console.log(`Tree at (${x}, ${y}) ${grid[y][x]} has a score of ${treeScore}`)

      maxScore = Math.max(maxScore, treeScore)
    }
  }

  return maxScore
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`).map(row => row.split('').map(o => Number(o)))


  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start

start()
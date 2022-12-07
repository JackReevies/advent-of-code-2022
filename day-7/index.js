const { timeFunction, getInput } = require('../common')

function arrayMatch(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    const element = arr1[i];
    if (arr2[i] !== element) return false
  }
  return true
}

function getByDir(numbers) {
  const dirs = {}
  const files = []
  let currentDir = ''
  let path = []
  for (let i = 0; i < numbers.length; i++) {
    const entry = numbers[i];

    if (entry.startsWith('$ cd ')) {
      const lastDir = currentDir
      currentDir = entry.replace("$ cd ", "")
      if (currentDir === '..') {
        // Resolve the parent of lastDir
        const tmp = files.find(o => o.dir === lastDir && arrayMatch(path.slice(0, path.length - 1), o.path))
        currentDir = tmp.parent
        path.pop()
      } else {
        path.push(currentDir)
      }

      continue
    }

    if (entry.startsWith("dir")) {
      files.push({ dir: entry.replace("dir ", ""), parent: currentDir, path: path.slice() })
      continue
    }

    if (entry.match(/^\d/)) {
      const [_, size, name] = /(\d+) (.+)/.exec(entry)
      files.push({ file: name, size, parent: currentDir, path: path.slice() })

      // We need to also add this size back in path chain
      for (let x = 0; x < path.length; x++) {
        const p = path.slice(0, x + 1).join('/')
        if (!dirs[p]) {
          dirs[p] = { name: currentDir, path: p, size: 0, files: [] }
        }

        dirs[p].size += Number(size)
        dirs[p].files.push(files[files.length - 1])
      }
    }
  }
  return dirs
}

function partOne(numbers) {
  const dirs = getByDir(numbers)
  const valid = Object.values(dirs).filter(o => o.size <= 100000)

  return valid.reduce((acc, obj) => acc + obj.size, 0)
}

function partTwo(numbers) {
  const dirs = getByDir(numbers)
  const FS = 70000000
  const MIN = 30000000
  const spaceAvailable = FS - dirs['/'].size
  const spaceNeeded = MIN - spaceAvailable

  const objs = Object.values(dirs).sort((a, b) => a.size < b.size ? -1 : 1)

  return objs.find(o => o.size > spaceNeeded).size
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start
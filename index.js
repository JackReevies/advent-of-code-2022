const fs = require('fs')

const fns = []
const answers = [[69289, 205615], [14297, 10498], [7763, 2569], [588, 911]]

function discoverDays() {
  for (let i = 1; i < 26; i++) {
    if (fs.existsSync(`./day-${i}/index.js`)) {
      fns.push(require(`./day-${i}/index.js`))
    }
  }
}

async function start() {
  discoverDays()

  for (let i = 0; i < fns.length; i++) {
    console.log(`Day ${i + 1}`)
    console.log('------')
    const fn = fns[i]
    const expected = answers[i]
    const actual = await fn()

    expected.forEach((val, i) => {
      const actualResult = actual[i]
      if (val === actualResult.ans) {
        console.log(`Task ${i + 1} is Correct (${val}) (took ${actualResult.ms}ms)`)
      } else {
        console.error(`Task ${i + 1} is Wrong (expected ${val} but got ${actualResult.ans}) (took ${actualResult.ms}ms)`)
      }
    })
    console.log('============')
  }
}

start()

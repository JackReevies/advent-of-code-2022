module.exports.interpretLetter = function interpretLetter(ascii) {
  const removeLetters = (str, arr) => str.split('').forEach(o => {
    const i = arr.indexOf(o)
    if (i > -1) {
      arr.splice(i, 1)
    }
  })

  const ERPDFHKLBNM = (ascii) => !ascii.map(o => o[0]).some(o => o === '.')
  const EFH = (ascii) => ascii[2].filter(o => o === '#').length === 3
  const ETFZ = (ascii) => !ascii[0].some(o => o === '.')
  const allBottom = (ascii) => !ascii[ascii.length - 1].some(o => o === '.')
  const HNM = (ascii) => !ascii.map(o => o[0]).some(o => o === '.') && !ascii.map(o => o[o.length - 1]).some(o => o === '.')
  const A = (ascii) => !ascii[3].some(o => o === '.')
  const R = (ascii) => ascii[3].filter(o => o === '#').length === 3
  const H = (ascii) => HNM(ascii) && !ascii[2].some(o => o === '.')
  const OC = (ascii) => ![ascii[0][0], ascii[5][0], ascii[0][3], ascii[5][3]].some(o => o === '#')
  const G = (ascii) => OC(ascii) && ![ascii[3][2], ascii[3][3]].some(o => o === '.')
  const M = (ascii) => H(ascii) && ![ascii[1][1], ascii[1][2]].some(o => o === '.')
  const W = (ascii) => HNM(ascii) && ![ascii[4][1], ascii[4][2]].some(o => o === '.')
  //const Z = (ascii) => ascii[4][0] === ascii[3][1] === ascii[2][2] === ascii[1][3] === '#'
  const UO = (ascii) => ![ascii[1][0], ascii[1][3], ascii[2][0], ascii[2][3], ascii[3][0], ascii[3][3], ascii[4][0], ascii[4][3], ascii[5][1], ascii[5][2]].some(o => o === '.') && ascii[5][0] === '.'
  const U = (ascii) => UO(ascii) && ascii[0][0] === '#' && ascii[0][3] === '#'
  const L = (ascii) => ERPDFHKLBNM(ascii) && !ascii[5].some(o => o === '.')
  const PB = (ascii) => ERPDFHKLBNM(ascii) && ascii[1][3] === '#'
  const B = (ascii) => PB(ascii) && ascii[4][3] === '#'
  // Order dependant
  const D = (ascii) => ERPDFHKLBNM(ascii) && ascii.filter(o => o[3] === '#').length === 4
  const K = (ascii) => ERPDFHKLBNM(ascii) && ascii[0][3] === '#' && ascii[5][3] === '#'
  const S = (ascii) => !ascii[0].slice(1).some(o => o === '.') && !ascii[5].slice(0, 3).some(o => o === '.') && ascii[1][0] === '#'
  const J = (ascii) => !ascii.slice(0, 5).map(o => o[3]).some(o => o === '.') && !ascii.slice(1, 3).map(o => o[0]).some(o => o === '#')
  const Q = (ascii) =>
    UO(ascii) && ascii[5][3] === '#' && ascii[4][2] === '#'

  'TYIXV'

  let letters = []

  let potential = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  // Letter I don't think AoC will include due to line thickness - prove me wrong!
  removeLetters('TIY', potential)

  // To limit E,R,P,D,F,H,K,L,B,N,M - the first column must be all shaded
  // if (!ERPDFHKLBNM(ascii)) {
  //   removeLetters('ERPDFHKLBNM', potential)
  // }


  if (UO(ascii)) {
    if (Q(ascii)) {
      return 'Q'
    }
    if (U(ascii)) {
      return 'U'
    }
    return 'O'
  }

  if (G(ascii)) {
    return 'G'
  }

  if (OC(ascii)) {
    // We've already checked for O
    return 'C'
  }

  if (ETFZ(ascii)) {
    if (EFH(ascii)) {
      if (allBottom(ascii)) {
        return 'E'
      }
      return 'F'
    } else {
      return 'Z'
    }
  }

  if (HNM(ascii)) {
    if (M(ascii)) {
      return 'M'
    }

    if (W(ascii)) {
      return 'W'
    }

    if (H(ascii)) {
      return 'H'
    }

    return 'N'
  }

  if (A(ascii)) {
    return 'A'
  }

  if (R(ascii)) {
    return 'R'
  }

  if (L(ascii)) {
    return 'L'
  }

  if (D(ascii)) {
    return 'D'
  } else if (K(ascii)) {
    return 'K'
  }

  if (PB(ascii)) {
    if (B(ascii)) {
      return 'B'
    }
    return 'P'
  }

  if (S(ascii)) {
    return 'S'
  }

  if (J(ascii)) {
    return 'J'
  }

  removeLetters('ETFZHNMAROUCLPBDSJ', potential)

  console.error(`Failed to detect letter`)
  console.error(ascii.map(o => o.join(" ")).join("\r\n"))
  console.error(`Unmatched letters are ${potential.join(', ')}`)
  //throw new Error(`Failed to detect letter for ${ascii}`)
}

/**
 * 
 * @param {Array<Array<>>} crt 
 */
module.exports.interpretDisplay = function interpretDisplay(crt) {
  const asciiChars = []

  for (let c = 0; c < 8; c++) {
    const x = Math.floor(5 * c)
    const y = 0
    const ascii = crt.map(o => o.slice(x, x + 4))
    asciiChars.push(ascii)
  }

  // Two ways to do this, either create a map of each ascii character and then match the arrays (ie, A looks like this, does the input match?)
  // or, use rules to determine what the character is (ie, if the first column is all shaded then it could be these letters)
  return asciiChars.map(o => module.exports.interpretLetter(o)).join('')
}

const A =
  `. # # .
# . . #
# . . #
# # # #
# . . #
# . . #
`

const B =
  `# # # .
# . . #
# # # .
# . . #
# . . #
# # # .`

const C =
  `. # # .
# . . #
# . . .
# . . .
# . . #
. # # .`

const D =
  `# # # .
# . . #
# . . #
# . . #
# . . #
# # # .`

const S =
  `. # # #
# . . .
. # # .
. . . #
. . . #
# # # .`

const N =
  `# . . #
# # . #
# # . #
# . # #
# . # #
# . . #`

const M =
  `# . . #
# # # #
# # # #
# . . #
# . . #
# . . #`

const U =
  `# . . #
# . . #
# . . #
# . . #
# . . #
. # # .`

const P =
  `# # # .
# . . #
# # # .
# . . .
# . . .
# . . .`

const J =
  `. # # #
. . . #
. . . #
. . . #
. . . #
. # # .`

const R =
  `# # # .
# . . #
# . . #
# # # .
# . # .
# . . #`

const Z =
  `# # # #
. . . #
. . # .
. # . .
# . . . 
# # # #`

const E =
  `# # # #
# . . .
# # # .
# . . .
# . . .
# # # #`

const K =
  `# . . #
# . # .
# # . .
# . # .
# . # .
# . . #
`

const F =
  `# # # #
# . . .
# # # .
# . . .
# . . .
# . . .`

const H =
  `# . . #
# . . #
# # # #
# . . #
# . . #
# . . #`

const L =
  `# . . .
# . . .
# . . .
# . . .
# . . .
# # # #`

const O =
  `. # # .
# . . #
# . . #
# . . #
# . . #
. # # .`

const Q =
  `. # # .
# . . #
# . . #
# . . #
# . # #
. # # #`

const W =
  `# . . #
# . . #
# . . #
# # # #
# # # #
# . . #`

const G =
  `. # # .
# . . #
# . . .
# . .##
# . . #
. # # .`


module.exports.runTests = function runTests() {
  const tests = { A, B, C, D, E, F, G, H, J, K, L, M, N, O, P, Q, R, S, U, W, Z }

  Object.keys(tests).forEach(letter => {
    const output = module.exports.interpretLetter(tests[letter].split('\n').map(o => o.split(' ')))
    if (output === letter) {
      return console.log(`PASS: ${letter}`)
    }
    console.error(`Failed: ${letter} (got ${output})`)
  })

  let prettyPrints = []
  let currentPretty = []

  Object.keys(tests).forEach(letter => {
    const ascii = tests[letter].split('\n').map(o => o.split(' '))
    ascii.forEach((row, i) => {
      if (!currentPretty[i]) {
        currentPretty[i] = []
      }
      currentPretty[i] = [...currentPretty[i], '.', ...row]
    })

    if (currentPretty[0].length >= 8 * 5) {
      prettyPrints.push(currentPretty)
      currentPretty = []
    }
  })

  prettyPrints.push(currentPretty)

  prettyPrints.forEach(o => console.log(o.map(o => o.slice(1).join(" ")).join("\r\n") + "\r\n"))

}
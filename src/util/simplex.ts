type Matrix = Array<Array<number>>

export const simplex = ($matrix: Matrix) => {
  let matrix = $matrix
  let shouldBreak = false
  let errors: Array<string> = []

  while (!shouldBreak) {
    const pivotColumn = findPivotColumn(matrix[0])

    console.log({ pivotColumn })
    if (!pivotColumn) {
      shouldBreak = true
      break
    }

    const pivotRow = findPivotRow(matrix, pivotColumn)
    console.log({ pivotRow })
    if (!pivotRow) {
      shouldBreak = true
      errors.push("Pivot Row = Undefined")
      break
    }

    matrix = performERO(matrix, pivotRow, pivotColumn)
  }

  return { matrix, errors }
}

const findPivotColumn = (objFunctionRow: Array<number>) => {
  const pivotColumnCandidate = objFunctionRow.reduce(
    (mostNegativeIndex, current, currentIndex) => {
      return current < objFunctionRow[mostNegativeIndex]
        ? currentIndex
        : mostNegativeIndex
    },
    0
  )

  const pivotColumn =
    objFunctionRow[pivotColumnCandidate] < 0
      ? pivotColumnCandidate
      : undefined

  return pivotColumn
}

const findPivotRow = (
  matrix: Matrix,
  pivotColumn: number
) => {
  const pivotColumnValue = matrix[0][pivotColumn]
  const rhsIndex = matrix[0].length - 1

  matrix.indexOf(
    Math.min(
      ...matrix
        .map(row => row[rhsIndex] / pivotColumnValue)
        .filter(el => el < 0)
    )
  )
}

const performERO = (
  matrix: Matrix,
  pivotRow: number,
  pivotColumn: number
) => {
  const pivotElement = matrix[pivotRow][pivotColumn]

  for (let i = 0; i < matrix[0].length; i++) {
    matrix[pivotRow][i] = matrix[pivotRow][i] / pivotElement
  }

  for (let i = 0; i < matrix.length; i++) {
    if (i !== pivotRow) {
      const rowMultiplier = matrix[i][pivotColumn]
      for (let j = 0; j < matrix[0].length; j++) {
        matrix[i][j] =
          matrix[i][j] - rowMultiplier * matrix[pivotRow][j]
      }
    }
  }

  return matrix
}

import { getConstraintLines } from "./graph"

type MinMax = {
  min: number
  max: number
}

type DecisionVariable = MinMax & { coefficient: number }

type SolveProps = {
  x: DecisionVariable
  y: DecisionVariable
  constraints: Array<
    MinMax & { xCoefficient: number; yCoefficient: number }
  >
  type: "min" | "max"
}

type Matrix = number[][]

export function solve(args: SolveProps) {
  const matrix = getMatrixFromValues(args)
  const results = simplex(structuredClone(matrix))
  const parsedResults = parseResults(results, matrix)
  return parsedResults
}

function getMatrixFromValues(args: SolveProps): Matrix {
  const { constraints, x, y } = args

  let varLength = 4 + constraints.length
  x.min && varLength++
  x.max && varLength++
  y.min && varLength++
  y.max && varLength++

  const matrix: Matrix = []

  for (let i = 0; i < constraints.length; i++) {
    // TODO: implement min constraint
    const { max, xCoefficient, yCoefficient } =
      constraints[i]
    const row: Array<number> = new Array(varLength).fill(0)
    row[0] = xCoefficient
    row[1] = yCoefficient
    row[i + 2] = 1
    row[varLength - 1] = max
    matrix.push(row)
  }

  if (x.max) {
    const row: Array<number> = new Array(varLength).fill(0)
    row[0] = 1
    row[2 + constraints.length] = 1
    row[varLength - 1] = x.max
    matrix.push(row)
  }
  if (y.max) {
    const row: Array<number> = new Array(varLength).fill(0)
    row[1] = 1
    row[2 + constraints.length + 1] = 1
    row[varLength - 1] = y.max
    matrix.push(row)
  }

  const objectiveRow: Array<number> =
    Array(varLength).fill(0)

  objectiveRow[0] = -x.coefficient
  objectiveRow[1] = -y.coefficient
  objectiveRow[varLength - 2] = 1
  matrix.push(objectiveRow)

  return matrix
}

function simplex(matrix: Matrix): Matrix {
  const numVars = matrix[0].length - 1
  const numRows = matrix.length

  while (true) {
    let pivotCol = -1
    for (let i = 0; i < numVars; i++) {
      if (matrix[numRows - 1][i] < 0) {
        pivotCol = i
        break
      }
    }
    if (pivotCol === -1) {
      return matrix
    }

    let pivotRow = -1
    let minRatio = Infinity
    for (let i = 0; i < numRows - 1; i++) {
      if (matrix[i][pivotCol] > 0) {
        const ratio =
          matrix[i][numVars] / matrix[i][pivotCol]
        if (ratio < minRatio) {
          minRatio = ratio
          pivotRow = i
        }
      }
    }
    if (pivotRow === -1) {
      throw new Error("Unbounded solution")
    }

    const pivotValue = matrix[pivotRow][pivotCol]

    for (let i = 0; i < numVars + 1; i++) {
      matrix[pivotRow][i] /= pivotValue
    }

    for (let i = 0; i < numRows; i++) {
      if (i !== pivotRow) {
        const multiplier = matrix[i][pivotCol]
        for (let j = 0; j < numVars + 1; j++) {
          matrix[i][j] -= multiplier * matrix[pivotRow][j]
        }
      }
    }
  }
}

function parseResults(results: Matrix, matrix: Matrix) {
  const objectiveFunctionRow = results[results.length - 1]
  const maximumValue =
    objectiveFunctionRow[objectiveFunctionRow.length - 1]

  const optimalXRow = results.find(
    result => result[0] === 1
  )

  const optimalYRow = results.find(
    result => result[1] === 1
  )

  if (optimalXRow == null || optimalYRow == null) {
    throw new Error("Error Happened!")
  }

  const optimalX = optimalXRow[optimalXRow.length - 1]
  const optimalY = optimalYRow[optimalYRow.length - 1]

  const lines = getConstraintLines(structuredClone(matrix))

  return {
    maximumValue,
    optimalX,
    optimalY,
    lines,
  }
}
// function getCorners(
//   matrix: number[][]
// ): { x: number; y: number }[] {
//   const numVars = matrix[0].length - 1
//   const numConstraints = matrix.length - 1
//   const cornerPoints: { x: number; y: number }[] = []

//   // Find the basic variables in each row of the matrix
//   const basicVars: number[] = new Array(numConstraints)
//   for (let i = 0; i < numConstraints; i++) {
//     let j = 0
//     while (j < numVars && matrix[i][j] === 0) {
//       j++
//     }
//     if (j < numVars && matrix[i][j] === 1) {
//       basicVars[i] = j
//     } else {
//       throw new Error("Matrix is not in standard form")
//     }
//   }

//   // Solve for the basic variables using the last column of the matrix
//   for (let i = 0; i < numConstraints; i++) {
//     let x = matrix[i][numVars]
//     for (let j = i + 1; j < numConstraints; j++) {
//       x -= matrix[j][numVars] * matrix[i][basicVars[j]]
//     }
//     cornerPoints.push({ x, y: matrix[i][basicVars[i]] })
//   }

//   return cornerPoints
// }

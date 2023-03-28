type Point = { x: number | null; y: number | null }
type Line = [Point, Point]

export function getConstraintLines(
  matrix: number[][]
): Line[] {
  console.log("l", matrix.length)
  const lines: Array<Line> = []
  for (let index = 0; index < matrix.length - 1; index++) {
    const line: Line = [
      {
        x: null,
        y: null,
      },
      {
        x: null,
        y: null,
      },
    ]
    const row = matrix[index]

    const a = row[0]
    const b = row[1]
    const c = row[row.length - 1]
    console.log({ a, b, c })
    console.log({ index })
    if (!a && !b) {
      continue
    }

    if (a === 0) {
      const constant = c / b
      console.log({ constant })
      line[0].x = 0
      line[0].y = constant
      line[1].x = null
      line[1].y = constant
      console.log({ line })
      lines.push(line)
      continue
    }
    if (b === 0) {
      const constant = c / a
      // console.log({ constant })
      line[0].x = constant
      line[0].y = 0
      line[1].x = constant
      line[1].y = null
      lines.push(line)
      continue
    }

    line[0].x = 0
    line[0].y = c / b
    line[1].x = c / a
    line[1].y = 0

    lines.push(line)
  }
  let maxX = 0
  let maxY = 0

  lines.forEach(line => {
    if ((line[0].x ?? 0) > maxX) maxX = line[0].x ?? 0
    if ((line[0].y ?? 0) > maxY) maxY = line[0].y ?? 0
    if ((line[1].x ?? 0) > maxX) maxX = line[1].x ?? 0
    if ((line[1].y ?? 0) > maxY) maxY = line[1].y ?? 0
  })
  console.log({ maxX, maxY })
  return lines.map(line => {
    let lineCopy = structuredClone(line)
    if (lineCopy[0].x === null) lineCopy[0].x = maxX
    if (lineCopy[0].y === null) lineCopy[0].y = maxY
    if (lineCopy[1].x === null) lineCopy[1].x = maxX
    if (lineCopy[1].y === null) lineCopy[1].y = maxY
    return lineCopy
  })
}

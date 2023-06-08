import { useEffect, useState } from "react"

interface Point {
  x: number
  y: number
}

const generatePolygonPoints = (
  numPoints: number
): Point[] => {
  const points: Point[] = []
  let hasX10 = false
  let hasY10 = false

  for (let i = 0; i < numPoints; i++) {
    let x: number, y: number

    // ensure at least one point has an x value of 10
    if (!hasX10 && i === numPoints - 1) {
      x = 6
      hasX10 = true
    } else {
      x = Math.floor(Math.random() * 7) // random x value between 0 and 10
    }

    // ensure at least one point has a y value of 10
    if (!hasY10 && i === numPoints - 2) {
      y = 6
      hasY10 = true
    } else {
      y = Math.floor(Math.random() * 7) // random y value between 0 and 10
    }

    points.push({ x, y })
  }

  return points
}

export const useRandomPoints = (
  pointCount: number = 15,
  interval: number = 1000
) => {
  const [polygonPoints, setPolygonPoints] = useState<
    Point[]
  >(generatePolygonPoints(pointCount))

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newPoints = generatePolygonPoints(pointCount)
      setPolygonPoints(newPoints)
    }, interval)
    return () => clearInterval(intervalId)
  }, [])

  return polygonPoints
}

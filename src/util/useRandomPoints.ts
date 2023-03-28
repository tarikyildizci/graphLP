import { useState, useEffect } from "react"

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
      x = 10
      hasX10 = true
    } else {
      x = Math.floor(Math.random() * 11) // random x value between 0 and 10
    }

    // ensure at least one point has a y value of 10
    if (!hasY10 && i === numPoints - 2) {
      y = 10
      hasY10 = true
    } else {
      y = Math.floor(Math.random() * 11) // random y value between 0 and 10
    }

    points.push({ x, y })
  }

  return points
}

const initialPolygonPoints: Point[] =
  generatePolygonPoints(6)

export const useRandomPoints = () => {
  const [polygonPoints, setPolygonPoints] = useState<
    Point[]
  >(initialPolygonPoints)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newPoints = generatePolygonPoints(6)
      setPolygonPoints(newPoints)
    }, 500)
    return () => clearInterval(intervalId)
  }, [])

  return polygonPoints
}

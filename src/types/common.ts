export enum OPERATOR {
  PLUS = "+",
  MINUS = "-",
}
export enum OBJECTIVE_TYPE {
  MAX = "Maximize",
  MIN = "Minimize",
}

export enum BOUND_TYPE {
  UB = "Upper Bound",
  LB = "Lower Bound",
  MB = "Mixed Bound",
}

export type GraphFormInputs = {
  xCoefficent: number
  yCoefficent: number
  operator: OPERATOR
  type: OBJECTIVE_TYPE
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  constraints: Array<{
    min: number
    max: number
    xNeeds: number
    yNeeds: number
    // type: BOUND_TYPE
  }>
}

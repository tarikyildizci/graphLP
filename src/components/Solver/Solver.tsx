import { Divider, Grid } from "@geist-ui/core"
import React from "react"
import { ObjectiveFunction } from "./ObjectiveFunction"
import { DecisionVariables } from "./DecisionVariables"
import { Constraints } from "./Constraints"
import { FormProvider, useForm } from "react-hook-form"
import { Section } from "../Section/Section"

export type SolverProps = {}

export enum ObjectiveFunctionEnum {
  min = "Minimize",
  max = "Maximize",
}
enum SignEnum {
  eq = "=",
  geq = "≥",
  leq = "≤",
  neq = "≠",
}

type DecisionVariableType = {
  id: string
  name: string
  description: string
  coefficient?: number
}

type ConstraintType = {
  decisionVariableCoefficients: Array<{
    id: string
    name: string
    coefficient: number
  }>
  sign: SignEnum
  rhs: number
}

export type SolverFormInputs = {
  decisionVariables: Array<DecisionVariableType>
  objectiveFunctionType: ObjectiveFunctionEnum
  constraints: Array<ConstraintType>
}

export const Solver: React.FC<SolverProps> = () => {
  const methods = useForm<SolverFormInputs>({
    defaultValues: {
      objectiveFunctionType: ObjectiveFunctionEnum.max,
      decisionVariables: [
        {
          id: "x1",
          description: "Amount of x1",
          name: "X1",
          coefficient: 1,
        },
        {
          id: "x2",
          description: "Amount of X2",
          name: "X2",
          coefficient: 1,
        },
      ],
      constraints: [
        {
          decisionVariableCoefficients: [
            {
              coefficient: 24,
              id: "X1",
              name: "X1 Constraint",
            },
            {
              coefficient: 24,
              id: "X2",
              name: "X2 Constraint",
            },
            {
              coefficient: 24,
              id: "X3",
              name: "X3 Constraint",
            },
          ],
          rhs: 10,
          sign: SignEnum.eq,
        },
        {
          decisionVariableCoefficients: [
            {
              coefficient: 24,
              id: "X1",
              name: "X1 Constraint",
            },
            {
              coefficient: 24,
              id: "X2",
              name: "X2 Constraint",
            },
            {
              coefficient: 24,
              id: "X3",
              name: "X3 Constraint",
            },
          ],
          rhs: 10,
          sign: SignEnum.eq,
        },
        {
          decisionVariableCoefficients: [
            {
              coefficient: 24,
              id: "X1",
              name: "X1 Constraint",
            },
            {
              coefficient: 24,
              id: "X2",
              name: "X2 Constraint",
            },
            {
              coefficient: 24,
              id: "X3",
              name: "X3 Constraint",
            },
          ],
          rhs: 10,
          sign: SignEnum.eq,
        },
        {
          decisionVariableCoefficients: [
            {
              coefficient: 24,
              id: "X1",
              name: "X1 Constraint",
            },
            {
              coefficient: 24,
              id: "X2",
              name: "X2 Constraint",
            },
            {
              coefficient: 24,
              id: "X3",
              name: "X3 Constraint",
            },
          ],
          rhs: 10,
          sign: SignEnum.eq,
        },
      ],
    },
  })
  return (
    <FormProvider {...methods}>
      <Grid.Container
        gap={2}
        style={{
          height: "calc(100vh - 16rem)",
          overflow: "auto",
        }}
      >
        <Grid xs={16}>
          <Grid.Container gap={2}>
            <Grid xs={12} height={"50%"}>
              <DecisionVariables />
            </Grid>
            <Grid xs={12}>
              <ObjectiveFunction />
            </Grid>
            <Grid xs={24}>
              <Constraints />
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid xs={8}>
          <Section title="Sidebar">
            {methods.watch("constraints").map(co => (
              <div>
                <ul>
                  {co.decisionVariableCoefficients.map(
                    ({ coefficient, name }) => (
                      <li>
                        <b>{name}: </b>
                        {coefficient}
                      </li>
                    )
                  )}
                </ul>
                <Divider />
              </div>
            ))}
          </Section>
        </Grid>
      </Grid.Container>
    </FormProvider>
  )
}

import { simplex } from "@/util/simplex"
import {
  Button,
  Card,
  Grid,
  Input,
  Modal,
  Table,
  Text,
} from "@geist-ui/core"
import { PlusCircle } from "@geist-ui/icons"
import React from "react"
import { Section } from "../Section/Section"
import {
  useFieldArray,
  useFormContext,
} from "react-hook-form"
import { SolverFormInputs } from "./Solver"
import { TableColumnRender } from "@geist-ui/core/esm/table"

export type ConstraintsProps = {}

const testMatrix = [
  [-5, -7, 0, 0, 0, 1, 0],
  [2, 3, 1, 0, 0, 0, 19],
  [1, 1, 0, 1, 0, 0, 8],
  [1, 0, 0, 0, 1, 0, 6],
]

export const Constraints: React.FC<
  ConstraintsProps
> = () => {
  const { control, watch, register } =
    useFormContext<SolverFormInputs>()
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "constraints",
  })

  const watchDecisionVariables = watch("decisionVariables")

  const renderCell = (
    value: any,
    rowData: any,
    index: number,
    decVarIndex: number
  ) => {
    const renderAction: TableColumnRender<any> = (
      value,
      rowData,
      index
    ) => {
      return (
        <Input
          scale={3 / 4}
          {...register(
            `constraints.${index}.decisionVariableCoefficients.${decVarIndex}.coefficient`
          )}
        />
      )
    }
    return renderAction(value, rowData, index)
  }

  return (
    <Section
      title="Constraints"
      headerButton={{
        text: "Add Constraint",
        onClick: () => {},
      }}
    >
      <Table
        data={fields.map(
          ({
            decisionVariableCoefficients,
            id,
            rhs,
            sign,
          }) => {
            let decObj: Record<string, number> = {}
            decisionVariableCoefficients.forEach(
              ({ coefficient, id, name }) =>
                (decObj[id] = coefficient)
            )
            return {
              ...decObj,
              sign,
              rhs,
            }
          }
        )}
      >
        {watchDecisionVariables.map(({ id, name }, idx) => (
          <Table.Column
            key={id}
            prop={name}
            label={name}
            render={(value, rowData, index) =>
              renderCell(value, rowData, index, idx)
            }
          />
        ))}
        <Table.Column prop={"sign"} label={"Sign"} />
        <Table.Column prop={"rhs"} label={"RHS"} />
      </Table>
    </Section>
  )
}

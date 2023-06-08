import {
  Button,
  Table as GeistTable,
  TableColumnProps,
} from "@geist-ui/core"
import { PlusCircle } from "@geist-ui/icons"
import React from "react"
import {
  useFieldArray,
  useFormContext,
} from "react-hook-form"
import { SolverFormInputs } from "./Solver"
import { Section } from "../Section/Section"

export type DecisionVariablesProps = {}

export const DecisionVariables: React.FC<
  DecisionVariablesProps
> = () => {
  const { control } = useFormContext<SolverFormInputs>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "decisionVariables",
  })

  return (
    <Section
      title="Decision Variables"
      headerButton={{
        text: "Add Decision Variable",
        onClick: () => {
          append({
            id: `x${fields.length + 1}`,
            description: `Amount of X${fields.length + 1}`,
            name: `X${fields.length + 1}`,
            coefficient: 0,
          })
        },
        icon: <PlusCircle />,
      }}
    >
      <Table
        columns={[
          {
            prop: "name",
            label: "Name",
          },
          {
            prop: "description",
            label: "Description",
          },
        ]}
        data={fields.map(field => ({
          name: field.name,
          description: field.description,
        }))}
        remove={remove}
      />
    </Section>
  )
}

const Table: React.FC<{
  columns: Array<{ prop: string; label: string }>
  data: Array<{ name: string; description: string }>
  remove: (index: number) => void
}> = ({ columns, data, remove }) => {
  const renderAction: TableColumnProps<any>["render"] = (
    _value,
    _rowData,
    index
  ) => {
    if (index < 2) {
      return
    }
    return (
      <Button
        auto
        scale={1 / 2}
        onClick={() => remove(index)}
        key={index}
      >
        Remove
      </Button>
    )
  }

  return (
    <GeistTable data={data}>
      {columns.map((col, idx) => (
        <GeistTable.Column key={idx} {...col} />
      ))}
      <GeistTable.Column
        prop={"action"}
        label="Action"
        width={150}
        render={renderAction}
      />
    </GeistTable>
  )
}

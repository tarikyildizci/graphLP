import React, { ReactNode } from "react"
import { Table as GeistTable } from "@geist-ui/core"

export type TableProps = {
  columns: Array<{ prop: string; label: string }>
  data: Array<{ prop: string; value: ReactNode }>
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
}) => {
  return (
    <GeistTable data={data}>
      {columns.map(({ label, prop }) => (
        <GeistTable.Column prop={prop} label={label} />
      ))}
    </GeistTable>
  )
}

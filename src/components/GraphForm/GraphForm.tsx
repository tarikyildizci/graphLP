import {
  GraphFormInputs,
  OBJECTIVE_TYPE,
  OPERATOR,
} from "@/types"
import {
  Button,
  Divider,
  Fieldset,
  Grid,
  Tabs,
} from "@geist-ui/core"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { ConstraintsForm } from "./ConstraintsForm"
import { DecisionVariablesForm } from "./DecisionVariablesForm"
import { ObjectiveFunctionForm } from "./ObjectiveFunctionForm"

export type GraphFormProps = {
  onSubmit: (data: GraphFormInputs) => void
}

export const GraphForm: React.FC<GraphFormProps> = ({
  onSubmit,
}) => {
  const methods = useForm<GraphFormInputs>({
    defaultValues: {
      type: OBJECTIVE_TYPE.MAX,
      operator: OPERATOR.PLUS,
      constraints: [
        {
          max: 19,
          xNeeds: 2,
          yNeeds: 3,
        },
        {
          max: 8,
          xNeeds: 1,
          yNeeds: 1,
        },
      ],
      xCoefficent: 5,
      yCoefficent: 7,
      xMax: 6,
      xMin: 0,
      yMax: 0,
      yMin: 0,
    },
  })

  return (
    <FormProvider {...methods}>
      <Grid.Container gap={1} direction="column">
        <Grid>
          <Tabs initialValue="1">
            <Tabs.Item label="Decision Variables" value="1">
              <DecisionVariablesForm />
            </Tabs.Item>
            <Tabs.Item label="Objective Function" value="2">
              <ObjectiveFunctionForm />
            </Tabs.Item>
            <Tabs.Item label="Constraints" value="3">
              <ConstraintsForm />
            </Tabs.Item>
          </Tabs>
        </Grid>
        <Grid>
          <Button
            type="secondary-light"
            onClick={methods.handleSubmit(onSubmit)}
          >
            Calculate Optimal Solution
          </Button>
        </Grid>
      </Grid.Container>
    </FormProvider>
  )
}

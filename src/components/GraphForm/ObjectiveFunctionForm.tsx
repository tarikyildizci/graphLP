import {
  Card,
  Divider,
  Grid,
  Input,
  Radio,
  Text,
} from "@geist-ui/core"
import React from "react"
import { useFormContext } from "react-hook-form"
import {
  GraphFormInputs,
  OBJECTIVE_TYPE,
  OPERATOR,
} from "@/types"

export type ObjectiveFunctionFormProps = {}

export const ObjectiveFunctionForm: React.FC<
  ObjectiveFunctionFormProps
> = () => {
  const { register, watch, setValue } =
    useFormContext<GraphFormInputs>()

  return (
    <Card>
      <Card.Content>
        <Text h3 b my={0}>
          Objective Function
        </Text>
      </Card.Content>
      <Divider h="1px" my={0} />
      <Card.Content>
        <Text>Coefficients</Text>
        <Grid.Container gap={1} direction="column">
          <Grid>
            <Input
              label="X Coefficient"
              htmlType="number"
              width="100%"
              {...register("xCoefficent")}
            />
          </Grid>
          <Grid>
            <Input
              label="Y Coefficient"
              htmlType="number"
              width="100%"
              {...register("yCoefficent")}
            />
          </Grid>
          <Grid>
            <Text>Operator</Text>
            <Radio.Group
              value={watch("operator")}
              onChange={val =>
                setValue("operator", val as OPERATOR)
              }
              useRow
            >
              <Radio value={OPERATOR.PLUS}>
                <Text my={0}>Plus</Text>
              </Radio>
              <Radio disabled value={OPERATOR.MINUS}>
                <Text my={0}>Minus</Text>
              </Radio>
            </Radio.Group>
          </Grid>
          <Grid>
            <Text>Function Type</Text>
            <Radio.Group
              value={watch("type")}
              onChange={val =>
                setValue("type", val as OBJECTIVE_TYPE)
              }
              useRow
            >
              <Radio value={OBJECTIVE_TYPE.MAX}>
                <Text my={0}>{OBJECTIVE_TYPE.MAX}</Text>
              </Radio>
              <Radio disabled value={OBJECTIVE_TYPE.MIN}>
                <Text my={0}>{OBJECTIVE_TYPE.MIN}</Text>
              </Radio>
            </Radio.Group>
          </Grid>
        </Grid.Container>
      </Card.Content>
      <Divider h="1px" my={0} />
      <Card.Content>
        <Text my={0}>
          Result: <b>{watch("type")}</b>{" "}
          <b>{watch("xCoefficent")}</b>X {watch("operator")}{" "}
          <b>{watch("yCoefficent")}</b>Y
        </Text>
      </Card.Content>
    </Card>
  )
}

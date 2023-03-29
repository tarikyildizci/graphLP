import {
  Card,
  Divider,
  Grid,
  Input,
  Text,
} from "@geist-ui/core"
import React from "react"
import { useFormContext } from "react-hook-form"

import { GraphFormInputs } from "@/types"

export const DecisionVariablesForm: React.FC = () => {
  const { register } = useFormContext<GraphFormInputs>()
  return (
    <Card>
      <Card.Content>
        <Text h3 b my={0}>
          Decision Variables
        </Text>
      </Card.Content>
      <Divider height="1px" my={0} />
      <Card.Content>
        <Text h5 b>
          X Values
        </Text>
        <Grid.Container gap={1} direction="column">
          <Grid>
            <Input
              disabled
              label="Min"
              width="100%"
              htmlType="number"
              {...register("xMin")}
            />
          </Grid>
          <Grid>
            <Input
              label="Max"
              width="100%"
              htmlType="number"
              {...register("xMax")}
            />
          </Grid>
        </Grid.Container>
      </Card.Content>
      <Divider height="1px" my={0} />
      <Card.Content>
        <Text h5 b>
          Y Values
        </Text>
        <Grid.Container gap={1} direction="column">
          <Grid>
            <Input
              disabled
              label="Min"
              width="100%"
              htmlType="number"
              {...register("yMin")}
            />
          </Grid>
          <Grid>
            <Input
              label="Max"
              width="100%"
              htmlType="number"
              {...register("yMax")}
            />
          </Grid>
        </Grid.Container>
      </Card.Content>
    </Card>
  )
}

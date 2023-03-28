import { GraphFormInputs } from "@/types"
import {
  Card,
  Divider,
  Grid,
  Input,
  Text,
} from "@geist-ui/core"
import React from "react"
import { useFormContext } from "react-hook-form"

export type DecisionVariablesFormProps = {}

export const DecisionVariablesForm: React.FC<
  DecisionVariablesFormProps
> = () => {
  const { register } = useFormContext<GraphFormInputs>()
  return (
    <Card>
      <Card.Content>
        <Text h3 b>
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
              label="Min"
              width="100%"
              {...register("xMin")}
            />
          </Grid>
          <Grid>
            <Input
              label="Max"
              width="100%"
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
              label="Min"
              width="100%"
              {...register("yMin")}
            />
          </Grid>
          <Grid>
            <Input
              label="Max"
              width="100%"
              {...register("yMax")}
            />
          </Grid>
        </Grid.Container>
      </Card.Content>
    </Card>
  )
}

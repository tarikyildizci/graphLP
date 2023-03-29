import {
  Button,
  Card,
  Divider,
  Grid,
  Input,
  Text,
} from "@geist-ui/core"
import PlusCircle from "@geist-ui/icons/plusCircle"
import Trash from "@geist-ui/icons/trash"
import React, { Fragment } from "react"
import {
  useFieldArray,
  useFormContext,
} from "react-hook-form"

import { GraphFormInputs } from "@/types"

export const ConstraintsForm: React.FC = () => {
  const { control, register } =
    useFormContext<GraphFormInputs>()
  const { fields, remove, prepend } = useFieldArray({
    name: "constraints",
    control,
  })

  const handleAddConstraint = () => {
    prepend({
      max: 0,
      min: 0,
      xNeeds: 0,
      yNeeds: 0,
    })
  }
  return (
    <Card>
      <Card.Content>
        <Text h3 b my={0}>
          Constraints
        </Text>
      </Card.Content>
      <Divider height="1px" my={0} />
      <Card.Content>
        <Grid.Container gap={1} direction="column">
          <Grid>
            <Button
              auto
              iconRight={<PlusCircle />}
              onClick={handleAddConstraint}
            >
              Add Constraint
            </Button>
          </Grid>
        </Grid.Container>
      </Card.Content>
      {fields.map((field, i) => (
        <Fragment key={field.id}>
          <Divider height="1px" my={0} />
          <Card.Content>
            <Grid.Container
              gap={1}
              padding={0}
              direction="column"
            >
              <Grid>
                <Grid.Container
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid>
                    <Text b h5 margin={0}>
                      Constraint #{fields.length - i}
                    </Text>
                  </Grid>
                  <Grid>
                    <Button
                      auto
                      ghost
                      icon={<Trash />}
                      type="error"
                      scale={0.75}
                      onClick={() => remove(i)}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid.Container>
              </Grid>
              <Grid>
                <Input
                  label="Capacity"
                  width="100%"
                  {...register(`constraints.${i}.max`)}
                />
              </Grid>
              <Grid>
                <Input
                  label="X Coefficient"
                  width="100%"
                  {...register(`constraints.${i}.xNeeds`)}
                />
              </Grid>
              <Grid>
                <Input
                  label="Y Coefficient"
                  width="100%"
                  {...register(`constraints.${i}.yNeeds`)}
                />
              </Grid>
            </Grid.Container>
          </Card.Content>
        </Fragment>
      ))}
    </Card>
  )
}

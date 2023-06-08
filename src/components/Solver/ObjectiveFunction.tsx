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
  ObjectiveFunctionEnum,
  SolverFormInputs,
} from "./Solver"
import { Section } from "../Section/Section"

export type ObjectiveFunctionProps = {}

export const ObjectiveFunction: React.FC<
  ObjectiveFunctionProps
> = () => {
  const { watch, register, setValue } =
    useFormContext<SolverFormInputs>()

  const watchDecisionVariables = watch("decisionVariables")
  const watchObjectiveFunctionType = watch(
    "objectiveFunctionType"
  )
  return (
    // <Card w={"100%"}>
    //   <Card.Content>
    //     <Grid.Container gap={1}>
    //       <Grid>
    //         <Text h3 b my={0}>
    //           Objective Function
    //         </Text>
    //       </Grid>
    //     </Grid.Container>
    //   </Card.Content>
    //   <Divider height="1px" my={0} />
    //   <Card.Content>
    //     <Grid.Container
    //       gap={1}
    //       style={{ maxHeight: "20vh", overflow: "auto" }}
    //     >
    //       {watchDecisionVariables.map(
    //         ({ name, id }, idx) => (
    //           <Grid xs={6} key={id}>
    //             <Input
    //               label={name}
    //               inputMode="numeric"
    //               htmlType="number"
    //               {...register(
    //                 `decisionVariables.${idx}.coefficient`
    //               )}
    //             />
    //           </Grid>
    //         )
    //       )}
    //     </Grid.Container>
    //   </Card.Content>

    //   <Card.Content>
    //     <Text b>Function Type</Text>
    //     <Radio.Group
    //       useRow
    //       initialValue={"max"}
    //       value={watchObjectiveFunctionType}
    //       onChange={val =>
    //         setValue(
    //           "objectiveFunctionType",
    //           val as ObjectiveFunctionEnum
    //         )
    //       }
    //     >
    //       <Radio value={ObjectiveFunctionEnum.max}>
    //         <Text small my={0}>
    //           Maximize
    //         </Text>
    //       </Radio>
    //       <Radio value={ObjectiveFunctionEnum.min}>
    //         <Text small my={0}>
    //           Minimize
    //         </Text>
    //       </Radio>
    //     </Radio.Group>
    //   </Card.Content>

    //   <Card.Content>
    //     <b> {watchObjectiveFunctionType}: </b>
    //     {watchDecisionVariables?.map(
    //       ({ name, coefficient }, index) =>
    //         coefficient ? (
    //           <span>
    //             {index !== 0 &&
    //               (coefficient >= 0 ? " + " : " - ")}
    //             <b>{Math.abs(coefficient)}</b>
    //             {name}
    //           </span>
    //         ) : null
    //     )}
    //   </Card.Content>
    // </Card>

    <Section title="Objective Function">
      <Grid.Container gap={1}>
        <Grid xs={24}>
          <Grid.Container
            gap={1}
            style={{ maxHeight: "20vh", overflow: "auto" }}
          >
            {watchDecisionVariables.map(
              ({ name, id }, idx) => (
                <Grid xs={6} key={id}>
                  <Input
                    label={name}
                    inputMode="numeric"
                    htmlType="number"
                    {...register(
                      `decisionVariables.${idx}.coefficient`
                    )}
                  />
                </Grid>
              )
            )}
          </Grid.Container>
        </Grid>
        <Grid xs={24}>
          <Grid.Container direction="column">
            <Grid>
              <Text b>Function Type</Text>
            </Grid>
            <Grid>
              <Radio.Group
                useRow
                initialValue={"max"}
                value={watchObjectiveFunctionType}
                onChange={val =>
                  setValue(
                    "objectiveFunctionType",
                    val as ObjectiveFunctionEnum
                  )
                }
              >
                <Radio value={ObjectiveFunctionEnum.max}>
                  <Text small my={0}>
                    Maximize
                  </Text>
                </Radio>
                <Radio value={ObjectiveFunctionEnum.min}>
                  <Text small my={0}>
                    Minimize
                  </Text>
                </Radio>
              </Radio.Group>
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid xs={24}>
          <b> {watchObjectiveFunctionType}: </b>
          {watchDecisionVariables?.map(
            ({ name, coefficient }, index) =>
              coefficient ? (
                <span key={index}>
                  {index !== 0 &&
                    (coefficient >= 0 ? " + " : " - ")}
                  <b>{Math.abs(coefficient)}</b>
                  {name}
                </span>
              ) : null
          )}
        </Grid>
      </Grid.Container>
    </Section>
  )
}

import {
  Card,
  CssBaseline,
  GeistProvider,
  Grid,
  Link,
  Note,
  Page,
  Spacer,
  Tabs,
  Text,
} from "@geist-ui/core"
import { XCircle } from "@geist-ui/icons"
import { Line, LineProps } from "@nivo/line"
import { useState } from "react"
import { Defs, linearGradientDef } from "@nivo/core"

import { GraphForm } from "./components/GraphForm/GraphForm"
import ToggleComponent from "./components/Toggle/Toggle"
import { GraphFormInputs } from "./types"
import { solve } from "./util"
import { useRandomPoints } from "./util/useRandomPoints"
import { HardDrive } from "@geist-ui/icons"
import { Cloud } from "@geist-ui/icons"
import { Solver } from "./components/Solver/Solver"

export default function App() {
  const randomPoints = useRandomPoints()
  const [data, setData] = useState<LineProps["data"]>()
  const [error, setError] = useState<string>()
  const [maxVal, setMaxVal] = useState<number>()
  const [optimalX, setOptimalX] = useState<number>()
  const [optimalY, setOptimalY] = useState<number>()

  const onSubmit = (data: GraphFormInputs) => {
    setError(undefined)
    setMaxVal(undefined)
    setOptimalX(undefined)
    setOptimalY(undefined)
    const {
      constraints,
      xCoefficent,
      xMax,
      xMin,
      yCoefficent,
      yMax,
      yMin,
    } = data
    try {
      const result = solve({
        type: "max",
        x: {
          coefficient: +xCoefficent,
          max: +xMax,
          min: +xMin,
        },
        y: {
          coefficient: +yCoefficent,
          max: +yMax,
          min: +yMin,
        },
        constraints: constraints.map(
          ({ max, min, xNeeds, yNeeds }) => ({
            max: +max,
            min: +min,
            xCoefficient: +xNeeds,
            yCoefficient: +yNeeds,
          })
        ),
      })
      setMaxVal(result.maximumValue)
      setOptimalX(result.optimalX)
      setOptimalY(result.optimalY)
      console.log("Lines")
      console.table(result.lines)
      console.log(
        result.lines.map((line, i) => ({
          id: i + 1,
          data: line,
        }))
      )
      setData(
        result.lines.map((line, i) => ({
          id: i + 1,
          data: line,
        }))
      )
      // setResult(JSON.stringify(error))
    } catch (error) {
      console.error(error)
      setError("An error happened")
    }
  }

  return (
    <GeistProvider>
      <CssBaseline />
      <Card
        width={"100%"}
        style={{
          position: "fixed",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "saturate(180%) blur(5px)",
          boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Content
          style={{ backgroundColor: "transparent" }}
          padding={0.5}
          paddingLeft={2}
        >
          <Grid.Container alignItems="center">
            <Text b h4>
              GraphLP
            </Text>
          </Grid.Container>
        </Card.Content>
      </Card>
      <Page>
        <Page.Content>
          <Spacer h={3} />
          {/* <Tabs initialValue="solver" hoverWidthRatio={1}> */}
          {/* <Tabs.Item
              label="Graph (2 Variables)"
              value="graph"
            >
              <Grid.Container
                direction="row"
                gap={4}
                width="100%"
              >
                <Grid xs={24} md={12}>
                  <GraphForm onSubmit={onSubmit} />
                </Grid>
                <Grid xs={24} md={12}>
                  <Grid.Container
                    direction="column"
                    gap={1}
                  >
                    <Grid>
                      <Line
                        height={500}
                        width={700}
                        data={
                          data ?? [
                            {
                              id: 1,
                              // color:
                              // "hsl(258.1005586592179, 70.19607843137256%, 50%)",
                              data: randomPoints,
                            },
                          ]
                        }
                        margin={{
                          top: 50,
                          right: 110,
                          bottom: 50,
                          left: 60,
                        }}
                        defs={[
                          linearGradientDef("gradientA", [
                            { offset: 0, color: "inherit" },
                            {
                              offset: 100,
                              color: "inherit",
                              opacity: 0,
                            },
                          ]),
                        ]}
                        fill={[
                          { match: "*", id: "gradientA" },
                        ]}
                        // colors={{
                        //   scheme: "red_blue",
                        // }}
                        enableArea
                        // curve="catmullRom"
                        enablePoints={false}
                        lineWidth={4}
                        // enableArea={!!data}
                        xScale={{ type: "linear" }}
                        // enableGridX={false}
                        // enableGridY={false}
                        // axisLeft={null}
                        // axisBottom={null}
                        tooltip={() => <div>Hello</div>}
                        // motionConfig="molasses"
                      />
                    </Grid>
                    {error && (
                      <Note
                        filled
                        label={false}
                        type="error"
                      >
                        <Text font="1.5rem">
                          Error: {error}
                        </Text>
                      </Note>
                    )}
                    {maxVal != null &&
                      optimalX != null &&
                      optimalY != null && (
                        <Note
                          filled
                          label={false}
                          type="success"
                        >
                          <Text font="1.5rem">
                            <b>Maximum Value =</b>{" "}
                            {maxVal.toFixed(2)}
                          </Text>

                          <Text font="1.5rem">
                            <b>Optimal X =</b>{" "}
                            {optimalX.toFixed(2)}
                          </Text>

                          <Text font="1.5rem">
                            <b>Optimal Y =</b>{" "}
                            {optimalY.toFixed(2)}
                          </Text>
                        </Note>
                      )}
                  </Grid.Container>
                </Grid>
              </Grid.Container>
            </Tabs.Item> */}
          {/* <Tabs.Item
              label="Solver (More Than 2 Variables)"
              value="solver"
            > */}
          <Solver />
          {/* </Tabs.Item>
          </Tabs> */}
        </Page.Content>
        <Page.Footer style={{ bottom: "44px" }}>
          <Grid.Container
            justify="space-between"
            gap={4}
            height={"32px"}
          >
            <Grid>
              <Text b span>
                Thanks to:{" "}
              </Text>
              <Text span>
                <Link
                  color
                  href="https://ba.metu.edu.tr/tr/personel/tam-zamanli-ogretim-elemanlari/gulsah-karakaya"
                  target="_blank"
                >
                  Gülşah Karakaya
                </Link>
                ,{" "}
                <Link
                  color
                  href="https://www.linkedin.com/in/ezgiarslan/"
                  target="_blank"
                >
                  Ezgi Arslan
                </Link>
                ,{" "}
                <Link
                  color
                  href="https://www.linkedin.com/in/berilgul/"
                  target="_blank"
                >
                  Beril Gül
                </Link>
                ,{" "}
                <Link
                  color
                  href="https://www.linkedin.com/in/canpekin/"
                  target="_blank"
                >
                  Can Pekin
                </Link>
              </Text>
            </Grid>
            <Grid>
              GraphLP v0.1 -{" "}
              <Link
                color
                href="https://www.linkedin.com/in/tarikyildizci/"
                target="_blank"
              >
                tarikyildizci
              </Link>
            </Grid>
          </Grid.Container>
        </Page.Footer>
      </Page>
    </GeistProvider>
  )
}

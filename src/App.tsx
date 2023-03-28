import {
  GeistProvider,
  CssBaseline,
  Page,
  Card,
  Spacer,
  Text,
  Grid,
  Link,
  Note,
} from "@geist-ui/core"
import { GraphForm } from "./components/GraphForm/GraphForm"
import { Line, LineProps } from "@nivo/line"
import { GraphFormInputs, OPERATOR } from "./types"
import { useState } from "react"
import { solve } from "./util"
import { useRandomPoints } from "./util/useRandomPoints"

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
      operator,
      type,
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
          <Grid.Container
            direction="row"
            gap={4}
            width="100%"
          >
            <Grid xs={24} md={8}>
              <GraphForm onSubmit={onSubmit} />
            </Grid>
            <Grid>
              <Grid.Container direction="column" gap={1}>
                <Grid>
                  {!data && (
                    <Line
                      height={500}
                      width={700}
                      data={[{ id: 1, data: randomPoints }]}
                      margin={{
                        top: 50,
                        right: 110,
                        bottom: 50,
                        left: 60,
                      }}
                      colors={{
                        scheme: "red_blue",
                      }}
                      xScale={{ type: "linear" }}
                    />
                  )}
                  {data && (
                    <Line
                      height={500}
                      width={700}
                      data={data}
                      margin={{
                        top: 50,
                        right: 110,
                        bottom: 50,
                        left: 60,
                      }}
                      colors={{
                        scheme: "red_blue",
                      }}
                      enableArea
                      xScale={{ type: "linear" }}
                    />
                  )}
                </Grid>
                {error && (
                  <Note label={false} filled type="error">
                    <Text font="1.5rem">
                      Error: {error}
                    </Text>
                  </Note>
                )}
                {maxVal != null &&
                  optimalX != null &&
                  optimalY != null && (
                    <Note
                      label={false}
                      filled
                      type="success"
                    >
                      <Text font="1.5rem">
                        <b>Maximum Value =</b> {maxVal}
                      </Text>

                      <Text font="1.5rem">
                        <b>Optimal X =</b> {optimalX}
                      </Text>

                      <Text font="1.5rem">
                        <b>Optimal Y =</b> {optimalY}
                      </Text>
                    </Note>
                  )}
              </Grid.Container>
            </Grid>
          </Grid.Container>
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
                  href="https://ba.metu.edu.tr/tr/personel/tam-zamanli-ogretim-elemanlari/gulsah-karakaya"
                  color
                >
                  Gülşah Karakaya
                </Link>{" "}
                ,{" "}
                <Link
                  href="https://www.linkedin.com/in/ezgiarslan/"
                  color
                >
                  Ezgi Arslan
                </Link>
                ,{" "}
                <Link
                  href="https://www.linkedin.com/in/berilgul/"
                  color
                >
                  Beril Gül
                </Link>
              </Text>
            </Grid>
            <Grid>GraphLP v0.1</Grid>
          </Grid.Container>
        </Page.Footer>
      </Page>
    </GeistProvider>
  )
}

import {
  Button,
  Card,
  Divider,
  Grid,
  Text,
} from "@geist-ui/core"
import React, { PropsWithChildren, ReactNode } from "react"

export type SectionProps = {
  title: string
  headerButton?: {
    text: string
    onClick: () => void
    icon?: ReactNode
  }
}

export const Section: React.FC<
  PropsWithChildren<SectionProps>
> = ({ title, headerButton, children }) => {
  return (
    <Card w={"100%"}>
      <Card.Content>
        <Grid.Container gap={1}>
          <Grid>
            <Text h3 b my={0}>
              {title}
            </Text>
          </Grid>
          <Grid>
            {headerButton && (
              <Button
                onClick={headerButton.onClick}
                auto
                icon={headerButton.icon}
                scale={0.75}
              >
                {headerButton.text}
              </Button>
            )}
          </Grid>
        </Grid.Container>
      </Card.Content>
      <Divider height="1px" my={0} />
      <Card.Content>{children}</Card.Content>
    </Card>
  )
}

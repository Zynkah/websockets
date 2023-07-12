import { Card, Text } from "@nextui-org/react";

export default function Sidebar() {
  return (
    <Card isHoverable css={{ mw: "450px", backgroundColor: "#bd8c7d" }}>
      <Card.Header>
        <Text
          h1
          size={60}
          css={{
            color: "#ffffff",
            padding: "1rem",
          }}
          weight="bold"
        >
          Events Rate Per Minute
        </Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body>
        <Text
          p
          size={12}
          css={{
            color: "#ffffff",
            padding: "1rem",
          }}
          weight="bold"
        >
          Total Events
        </Text>
      </Card.Body>
    </Card>
  );
}

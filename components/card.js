import { Card, Text } from "@nextui-org/react";

export default function Cards() {
  return (
    <Card isHoverable css={{ mw: "600px" }}>
      <Text
        h1
        size={14}
        css={{
          color: "#49494b",
          padding: "1rem",
        }}
        weight="bold"
        id="message_user" 
      ></Text>
    </Card>
  );
}

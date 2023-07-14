import { Card } from "@nextui-org/react";
import WebSocketComponent from "./websocket";

export default function Cards() {
  return (
    <Card isHoverable css={{ mw: "800px", backgroundColor: " #49494b"  }}>
      <WebSocketComponent />
    </Card>
  );
}

import { Card } from "@nextui-org/react";
import WebSocketComponent from "./websocket";

export default function Cards() {
  return (
    <Card css={{ mw: "1500px" }}>
      <WebSocketComponent />
    </Card>
  );
}

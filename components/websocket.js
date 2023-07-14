import { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Text,
  Container,
  Row,
  Col,
  Progress,
} from "@nextui-org/react";
import formatTimestamp from "./formattedTime";

let counter = 0;
let eventFrequencyRate = 0;


export default function WebSocketComponent() {
  const [events, setEvents] = useState([]);
  const [previousEventTime, setPreviousEventTime] = useState(Date.now());

  useEffect(() => {
    const socket = new WebSocket("ws://beeps.gg/stream");
    socket.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      setEvents((events) => [eventData, ...events]);
      counter++;

      const currentTime = Date.now();
      const timeElapsed = currentTime - previousEventTime;
      const rate = counter / (timeElapsed / (1000 * 60));
      eventFrequencyRate = rate.toFixed(2);
      setPreviousEventTime(currentTime);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <Container responsive gap={0}>
      <Row gap={1}>
        <Col span={4}>
          <Text
            size={30}
            css={{
              color: "#bd8c7d",
              padding: "1rem",
            }}
            weight="bold"
          >
            Statistics
          </Text>

          <Card
            css={{
              height: "320px",
              backgroundColor: "#bd8c7d",
              paddingRight: "1rem",
            }}
          >
            <Card.Header>
              <Text
                size={20}
                css={{
                  color: "#ffffff",
                  padding: "1rem",
                }}
                weight="bold"
              >
                Event Frequency: {eventFrequencyRate} events per minute
              </Text>
            </Card.Header>
            <Progress
              color="gradient"
              value={eventFrequencyRate}
              css={{ margin: "0.5rem" }}
            />
            <Card.Divider />
            <Card.Body>
              <Text
                size={20}
                css={{
                  color: "#ffffff",
                  padding: "1rem",
                }}
                weight="bold"
              >
                Event Counter : {counter}
              </Text>
            </Card.Body>
          </Card>
        </Col>

        <Col span={8}>
          {events.map((event, index) => (
            <Card key={index} css={{ mw: "800px", marginBottom: "1rem" }}>
              <Container key={event.id}>
                <Card.Header>
                  <Avatar
                    rounded
                    src={event.user.image_url}
                    css={{ marginRight: "1rem" }}
                  />
                  <Text>{event.user.name}</Text>
                  <Text css={{ marginLeft: "1rem", color: "#bd8c7d" }}>
                    @{event.user.username}
                  </Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ padding: "1rem" }}>
                  <Text css={{ color: "#bd8c7d" }}>
                  @ {formatTimestamp(event.timestamp)}
                  </Text>
                  <Text css={{ margin: "1rem" }}>{event.message}</Text>
                </Card.Body>
                <Card.Footer>
                  <Text css={{ color: "steelblue" }}>#{event.tags}</Text>
                </Card.Footer>
              </Container>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

/* 
{
    "id": "lIkg",
    "timestamp": 1689278071000,
    "user": {
        "id": 14710,
        "image_url": "http://loremflickr.com/208/207/",
        "name": "Drew Barrymore",
        "username": "kuhic1954"
    },
    "message": "Previously gleaming bunch anywhere then myself instance congregation caused nevertheless balloon way.",
    "tags": [
        "deep v",
        "celiac",
        "PBR\u0026B",
        "next level",
        "cornhole"
    ]
}
*/

import { useEffect, useState } from "react";
import { Card, Avatar, Text, Container, Row, Col } from "@nextui-org/react";

export default function WebSocketComponent() {
  const [events, setEvents] = useState([]);
  const [counter, setCounter] = useState(0);
  const [previousEventTime, setPreviousEventTime] = useState(Date.now());
  const [eventFrequency, setEventFrequency] = useState(0);

  useEffect(() => {
    const socket = new WebSocket("ws://beeps.gg/stream");
    socket.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      setEvents((events) => [eventData, ...events]);
      setCounter((prevCounter) => prevCounter + 1);

      const currentTime = Date.now();
      const timeElapsed = currentTime - previousEventTime;
      const rate = counter / (timeElapsed / 1000);
      setEventFrequency(rate.toFixed(2));
      setPreviousEventTime(currentTime);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <Container responsive gap={0}>
        <Row gap={1}>
          <Col span={4}>
            <Text
              h1
              size={30}
              css={{
                color: "#ffffff",
                padding: "1rem",
              }}
              weight="bold"
            >
              Statistics
            </Text>
            <Card
              isHoverable
              css={{ height: "350px", backgroundColor: "#bd8c7d" }}
            >
              <Card.Header>
                <Text
                  p
                  size={20}
                  css={{
                    color: "#ffffff",
                    padding: "1rem",
                  }}
                  weight="bold"
                >
                  Event Frequency: {eventFrequency} events per second
                </Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body>
                <Text
                  p
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
                <div key={event.id}>
                  <Card.Header>
                    <Avatar
                      rounded
                      src={event.user.image_url}
                      css={{ marginRight: "1rem" }}
                    />
                    <Text>{event.user.name}</Text>
                    <Text css={{ marginLeft: "1rem", color: "silver" }}>
                      @{event.user.username}
                    </Text>
                  </Card.Header>
                  <Card.Divider />
                  <Card.Body css={{ padding: "1rem" }}>
                    <Text css={{ color: "silver" }}>
                      @ {Date("d-m-Y H:i:s", event.timestamp)}
                    </Text>
                    <Text css={{ margin: "1rem" }}>{event.message}</Text>
                  </Card.Body>
                  <Card.Footer>
                    <Text css={{ color: "steelblue" }}>#{event.tags}</Text>
                  </Card.Footer>
                </div>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </>
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

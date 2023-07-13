import { useEffect, useState } from "react";
import { Card, Avatar, Text } from "@nextui-org/react";

export default function WebSocketComponent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://beeps.gg/stream");
    socket.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      setEvents((events) => [eventData, ...events]);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      {events.map((event, index) => (
        <Card key={index} css={{ mw: "800px", marginBottom: "1rem" }}>
          <div key={event.id}>
            <Card.Header>
              <Avatar
                rounded
                src={event.user.image_url}
                css={{ marginRight: "10px" }}
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
              <Text>{event.message}</Text>
            </Card.Body>
            <Card.Footer>
              <Text css={{ color: "blue" }}>#{event.tags}</Text>
            </Card.Footer>
          </div>
        </Card>
      ))}
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

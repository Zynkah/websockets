"use client";
import { Text, Grid, Card } from "@nextui-org/react";
import styles from "./page.module.css";

const ws = new WebSocket("ws://beeps.gg/stream");
// const message_user = document.getElementById("message_user");
ws.addEventListener("open", () => {
  console.log("connected");
});
ws.addEventListener("message", (event) => {
  console.log(event);
  // document.getElementById("message").innerText = event.data;
});

ws.onmessage = (event) => {
  const message_user = JSON.parse(event.data);
  console.log(message_user.user.username);
  document.getElementById("message_user").innerText = message_user.user.username;
  // message_user.innerText = message_user.user.username;
};

export default function Home() {
  return (
    <main className={styles.main}>
      <Grid.Container gap={2} justify="center">
        <Grid xs={4}>
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
        </Grid>
        <Grid xs={8}>
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
        </Grid>
      </Grid.Container>
    </main>
  );
}

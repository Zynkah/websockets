"use client";
import { Grid } from "@nextui-org/react";
import styles from "./page.module.css";
import Cards from "../../components/card";
import Sidebar from "../../components/sidebar";


const ws = new WebSocket("ws://beeps.gg/stream");

const message_user = document.getElementById("message_user");
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
  // document.getElementById("message_user").innerText =
  //   message_user.user.username;
  message_user.innerText = message_user.user.username;
};

export default function Home() {
  return (
    <main className={styles.main}>
      <Grid.Container gap={2} justify="center">
        <Grid xs={4}>
          <Sidebar />
        </Grid>
        <Grid xs={8}>
          <Cards />
        </Grid>
      </Grid.Container>
    </main>
  );
}

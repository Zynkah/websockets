"use client";
import { Grid } from "@nextui-org/react";
import styles from "./page.module.css";
import Cards from "../../components/card";
import Sidebar from "../../components/sidebar";
import WebSocketComponent from "../../components/websocket";

export default function Home() {
  return (
    <main className={styles.main}>
      <Grid.Container gap={2} justify="center">
        <Grid xs={4}>
          <Sidebar />
        </Grid>
        <Grid xs={8}>
          <Cards />
          {/* <WebSocketComponent /> */}
        </Grid>
      </Grid.Container>
    </main>
  );
}

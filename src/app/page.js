"use client";
import styles from "./page.module.css";
import Cards from "../../components/card";


export default function Home() {
  return (
    <main className={styles.main}>
      <Cards />
    </main>
  );
}

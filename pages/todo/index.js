import React from "react";

import Head from "next/head";
import { Typography } from "@mui/material";
import styles from "../../styles/Home.module.css";
import Navigation from "../../components/Navigation";
import TopBar from "../../components/TopBar";
import TasksDisplay from "../../components/TasksDisplay";

export default function Todo() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Coarse</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"
        />
      </Head>

      <TopBar />

      <main>
        <Typography sx={{ display: { xs: "none", md: "block" } }}>
          <h1 className={styles.pageTitle}>Tasks</h1>
        </Typography>

        <TasksDisplay />
      </main>

      <Navigation current="todo" />
    </div>
  );
}

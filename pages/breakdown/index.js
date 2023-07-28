import React from "react";

import Head from "next/head";
import { Typography } from "@mui/material";
import styles from "../../styles/Home.module.css";
import Navigation from "../../components/Navigation";
import TopBar from "../../components/TopBar";
import BreakdownDisplay from "../../components/BreakdownDisplay";

export default function Breakdown() {
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
          <h1 className={styles.pageTitle}>Breakdown</h1>
        </Typography>
        <BreakdownDisplay />
      </main>

      <Navigation current="breakdown" />
    </div>
  );
}

import React from "react";

import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Navigation from "../../components/Navigation";
import TopBar from "../../components/TopBar";

export default function Statistics() {
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
        <h1 className={styles.pageTitle}>Statistics </h1>
      </main>

      <Navigation current="statistics" />
    </div>
  );
}

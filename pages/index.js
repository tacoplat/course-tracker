import React from "react";

import Head from "next/head";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Coarse</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Coarse</h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>

      <footer>
        <p>Copyright Goes Here</p>
      </footer>
    </div>
  );
}

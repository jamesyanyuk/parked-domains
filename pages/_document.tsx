import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
          <link href="https://calendly.com/assets/external/widget.css" rel="stylesheet" />

          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=xQOlW6Mxj2" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=xQOlW6Mxj2" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=xQOlW6Mxj2" />
          <link rel="manifest" href="/site.webmanifest?v=xQOlW6Mxj2" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg?v=xQOlW6Mxj2" color="#086efa" />
          <link rel="shortcut icon" href="/favicon.ico?v=xQOlW6Mxj2" />
          <meta name="msapplication-TileColor" content="#086efa" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body className="fade">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

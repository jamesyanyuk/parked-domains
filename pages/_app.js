import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js" />
      <Script
        src="https://unpkg.com/scrollreveal@3.3.2/dist/scrollreveal.min.js"
        onReady={() => {
          window.sr = ScrollReveal({ reset: true });
          sr.reveal(".fade", {
            duration: 750,
            delay: 250,
            distance: "22px",
            scale: 1,
          });
        }}
      />

      <Head>
        <title>Parked Domain | Yanyuk</title>
        <meta name="description" content="Parked Domain | Yanyuk" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

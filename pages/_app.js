import "../styles/globals.css";
import "daisyui/dist/full.css";
import "tailwindcss/tailwind.css";
import { useEffect } from "react";
import Head from "next/head";
import NavBarTop from "../components/NavBarTop";
import NavBar from "../components/NavBar";

("use client;");

function App({ Component, pageProps, router }) {
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <>
      <Head>
        <title>Blend Fuel</title>
      </Head>
      <NavBar />
      <NavBarTop />
      <Component {...pageProps} key={router.route} />
    </>
  );
}

export default App;

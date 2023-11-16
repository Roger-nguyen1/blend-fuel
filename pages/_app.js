import "../styles/globals.css";
import "daisyui/dist/full.css";
import "tailwindcss/tailwind.css";

import Head from "next/head";
import NavBar from "../components/NavBar";

function App({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <title>Blend Fuel</title>
      </Head>
      <NavBar />
      <Component {...pageProps} key={router.route} />
    </>
  );
}

export default App;

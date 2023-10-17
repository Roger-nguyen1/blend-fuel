import "../styles/globals.css";
import "daisyui/dist/full.css";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Blend Fuel</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;

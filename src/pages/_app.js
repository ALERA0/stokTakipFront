import { Montserrat } from "next/font/google";
import Head from "next/head";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../redux/store";


const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        {" "}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${montserrat.variable} font-mont bg-light w-full min-h-screen  `}
      >
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}

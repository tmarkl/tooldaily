import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  <Head>
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8989983316282743"
      crossOrigin="anonymous"
    ></script>
  </Head>;
  return <Component {...pageProps} />;
}

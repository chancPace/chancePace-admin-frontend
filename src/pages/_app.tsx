import Template from "@/layouts/Template";
import { GlobalStyled } from "@/styles/global";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Chance Pace</title>
      </Head>
      <GlobalStyled />
      <Template>
        <Component {...pageProps} />
      </Template>
    </>
  );
}

import "@/styles/globals.css";
import Head from "next/head";

import { WagmiConfig, createClient, configureChains } from "wagmi";
import {
  avalanche,
  bsc,
  mainnet,
  goerli,
  polygon,
  polygonMumbai,
  sepolia,
} from "@wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

export default function App({ Component, pageProps }) {
  const { chains, provider, webSocketProvider } = configureChains(
    [avalanche, bsc, mainnet, goerli, polygon, polygonMumbai, sepolia],
    [
      alchemyProvider({ apiKey: "ci-UCdnjUtCTp8oLAj9X4iyD1dTR90vp" }),
      publicProvider(),
    ]
  );

  // Set up client
  const client = createClient({
    autoConnect: true,
    connectors: [new MetaMaskConnector({ chains })],
    provider,
    webSocketProvider,
  });

  return (
    <>
      <Head>
        <title>Box Protocol</title>
        <meta
          name="description"
          content="A DeFi app that lets you invest in tokenized boxes of crypto assets representing the hottest ideas and sectors in Web3."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/BoxProtocol.ico" />
      </Head>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </>
  );
}

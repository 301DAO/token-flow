import * as React from 'react';
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  wallet,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from '@rainbow-me/rainbowkit-siwe-next-auth';

import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli],
  [
    // jsonRpcProvider({
    //   rpc: (chain) => ({
    //     http: process.env.ANKR_GOERLI_RPC_URL as string,
    //   }),
    // }),
    publicProvider(),
  ]
);

const { wallets } = getDefaultWallets({
  appName: 'Graph Flow',
  chains,
});

const demoAppInfo = {
  appName: 'Graph Flow',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [wallet.argent({ chains }), wallet.trust({ chains }), wallet.ledger({ chains })],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to Graph Flow',
});

export default function App({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = React.useState(true);
  const [queryClient] = React.useState(() => new QueryClient());

  React.useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    !isSSR && (
      <>
        <Head>
          <title>ETH Online Demo</title>
          <meta name="description" content="ETH Online Hackathon 2022 Demo" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={(pageProps as any).dehydratedState}>
            <SessionProvider refetchInterval={0} session={(pageProps as any).session}>
              <WagmiConfig client={wagmiClient}>
                <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
                  <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
                    <Component {...pageProps} />
                  </RainbowKitProvider>
                </RainbowKitSiweNextAuthProvider>
              </WagmiConfig>
            </SessionProvider>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </>
    )
  );
}

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useWeb3React } from '@web3-react/core';
import { useContext, useEffect } from 'react';
import { SandboxFlowContext } from '../hooks/sandbox-flow-store';

function App({ Component, pageProps }: AppProps) {
    return (
        <Component {...pageProps} />
    )
}

export default App;

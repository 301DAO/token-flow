import * as React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Container from '../components/container/Container'
import Mezzanine from '../components/navbar/Mezzanine'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers';
import SandboxFlowStore from '../hooks/sandbox-flow-store';


function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
}

const Home: NextPage = () => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <SandboxFlowStore>
                <div>
                    <Head>
                        <title>ETH Online Demo</title>
                        <meta name="description" content="ETH Online Hackathon 2022 Demo" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>

                    <main className='h-screen flex flex-col'>
                        <Mezzanine />
                        <Container />
                    </main>
                </div>
            </SandboxFlowStore>
        </Web3ReactProvider>
    )
};

export default Home;

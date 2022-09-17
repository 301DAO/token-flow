import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Container from '../components/Container'
import Mezzanine from '../components/Mezzanine'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ETH Online Demo</title>
        <meta name="description" content="ETH Online Hackathon 2022 Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='h-screen flex flex-col'>
        <Mezzanine />
        <Container />
      </main>
    </>
  )
};

export default Home;

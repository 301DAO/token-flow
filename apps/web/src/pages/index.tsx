import * as React from 'react';
import type { NextPage } from 'next';
import Container from '../components/container/Container';
import Mezzanine from '../components/navbar/Mezzanine';
import SandboxFlowStore from '../hooks/sandbox-flow-store';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

const fetchData = async () =>
  fetch('https://jsonplaceholder.typicode.com/todos/1').then((res) => res.json());

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['data'], fetchData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Home: NextPage = () => {
  const router = useRouter();
  const { isConnected, isConnecting, isDisconnected, address } = useAccount();

  const { data } = useQuery(['data'], fetchData);

  console.log({ data });

  React.useEffect(() => {
    if (isDisconnected || !isConnected || !address) router.push('/login');
  }, [isConnected, isConnecting, isDisconnected, address, router]);
  return (
    <SandboxFlowStore>
      <main className="h-screen flex flex-col">
        <Mezzanine />
        <Container />
      </main>
    </SandboxFlowStore>
  );
};

export default Home;

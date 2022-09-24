import * as React from 'react';
import type { NextPage } from 'next';
import Container from '../components/container/Container';
import Mezzanine from '../components/navbar/Mezzanine';
import SandboxFlowStore from '../hooks/sandbox-flow-store';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  const { isConnected, isConnecting, isDisconnected, address } = useAccount();

  React.useEffect(() => {
    if (isDisconnected || !isConnected || !address) router.push('/login');
  }, [isConnected, isConnecting, isDisconnected, address]);
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

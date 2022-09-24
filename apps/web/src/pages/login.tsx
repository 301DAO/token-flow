import * as React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { getAuthOptions } from './api/auth/[...nextauth]';
import { useAccount } from 'wagmi';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    return {
        props: {
            session: await unstable_getServerSession(
                req,
                res,
                getAuthOptions(req)
            ),
        },
    };
};

export default function Login() {
    const router = useRouter();
    const { status } = useSession();
    const { isConnected } = useAccount();

    React.useEffect(() => {
        if (isConnected && status === 'authenticated') router.push('/');
    }, [isConnected, router, status]);
    return (
        <main className="flex w-full h-screen items-center justify-center bg-slate-800">
            <ConnectButton />
        </main>
    );
}

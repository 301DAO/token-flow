import { useWeb3React } from '@web3-react/core';
import * as React from 'react';
import ChainSelectPopover from './ChainSelectPopover';
import WalletBalance from './WalletBalance';
import ConnectButton from './ConnectButton';

function Web3Connect() {
    const { account, library, chainId } = useWeb3React();

    const [chainSelectPopoverVisible, setChainSelectPopoverVisible] = React.useState(false);

    if (!!account && !!library) {
        return <div className='flex flex-row-reverse grow-[100] items-center justify-self-start text-sm shrink-0'>
            {/* reverse order */}
            <img src='help.svg' className='h-6 mr-8' />
            <img src='/notification.svg' className='h-6 mr-8' />

            <span className='h-6 mr-8 border-l border-solid border-custom-gray' />

            <ConnectButton />

            <WalletBalance />

            <div>
                <div onMouseOver={() => setChainSelectPopoverVisible(true)} onMouseLeave={() => setChainSelectPopoverVisible(false)} className='flex flex-row rounded-lg bg-white p-1.5 border-white mr-8' >
                    <img src='/EthLogo.png' className='h-5 mr-2' />
                    <img src='/down-arrow.svg' className='h-5' />
                </div>
                <div className={`absolute z-20 hover:visible ${chainSelectPopoverVisible ? 'visible' : 'invisible'}`}>
                {/* <div className={`absolute z-20 hover:visible visible`}> */}
                    <ChainSelectPopover />
                </div>
            </div>
        </div>;
    } else {
        return <div className='flex flex-row-reverse grow-[100] items-center justify-self-start text-sm shrink-0'>
            {/* reverse order */}
            <img src='help.svg' className='h-6 mr-8' />
            <img src='/notification.svg' className='h-6 mr-8' />

            <span className='h-6 mr-8 border-l border-solid border-custom-gray' />

            <ConnectButton />
        </div>;
    }
}

export default Web3Connect;

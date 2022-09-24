import { useAccount } from 'wagmi';
import * as React from 'react';
import ChainSelectPopover from './ChainSelectPopover';
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import WalletBalance from './WalletBalance';
// import ConnectButton from './ConnectButton';

function Web3Connect() {
    const { address, isConnected } = useAccount();

    const [chainSelectPopoverVisible, setChainSelectPopoverVisible] =
        React.useState(false);

    return (
        <div className="flex flex-row-reverse grow-[100] items-center justify-self-start text-sm shrink-0">
            {/* reverse order */}
            <img src="help.svg" className="h-6 mr-8" />
            <img src="/notification.svg" className="h-6 mr-8" />
            <span className="h-6 mr-8 border-l border-solid border-custom-gray" />

            <ConnectButton />
        </div>
    );
}

export default Web3Connect;

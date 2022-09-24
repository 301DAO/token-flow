import * as React from 'react';
import MenuItem from './MenuItem';
import Web3Connect from './web3-connect/Web3Connect';
import { ConnectButton } from '@rainbow-me/rainbowkit';
function Mezzanine(props: {}) {
    return (
        <div className="h-20 shrink-0 bg-primary-bg">
            <div className="flex flex-row pt-4 min-w-full items-center pr-4">
                <img src="/stats.svg" className="h-6 ml-8 mr-16" />
                <MenuItem menuName="Recipes" link="" />
                <MenuItem menuName="Marketplace" link="" />
                <MenuItem menuName="Playground" link="" />
                <Web3Connect />
            </div>
        </div>
    );
}

export default Mezzanine;

import * as React from 'react';


function ChainSelectPopover(props: {}) {
    return <div className='flex flex-col mt-3 rounded-lg bg-primary-alt shadow w-60 pb-4'>
        <div className='pt-2 pl-2 text-slate-700'>Select a network</div>
        <NetworkSelect
            selected
            networkName='Ethereum'
            networkLogoPath='/EthLogo.png'
            explorerConfigs={[{
                explorerUrl: 'https://etherscan.io/',
                explorerName: 'Etherscan'
            }]}
        />
        <NetworkSelect selected={false} networkName='Polygon' networkLogoPath='/polygon-logo.webp' />
        <NetworkSelect selected={false} networkName='Optimism' networkLogoPath='/optimism-logo.svg' />
        <NetworkSelect selected={false} networkName='Arbitrum' networkLogoPath='/arbitrum-logo.webp' />
    </div>;
}

interface NetworkSelectProps {
    selected: boolean;
    networkLogoPath: string;
    networkName: string;
    explorerConfigs?: Array<{
        explorerName: string;
        explorerUrl: string;
    }>
}

function NetworkSelect (props: NetworkSelectProps) {
    const { selected, networkLogoPath, networkName, explorerConfigs } = props;
    if (selected) {
        return <div className='rounded-lg bg-white mt-2 pb-4 mx-4'>
            <div className='flex flex-row items-center' >
                <img className='h-6 shrink-0 mt-2 mr-2 ml-2' src={networkLogoPath} />
                <div className='grow mt-2 mr-6'>{networkName}</div>
                <div className='bg-green-500 rounded-full h-2 w-2 shrink-0 mt-2 mr-2'></div>
            </div>
            {(explorerConfigs || [])
                .map(config =>
                    <a
                        href={config.explorerUrl}
                        className='flex flex-row items-center hover:text-neutral-700 text-neutral-500'
                        key={config.explorerName}
                        target='_blank' rel='noopener noreferrer'
                    >
                        <div className='mt-2 ml-2 text-xs grow'>
                            {config.explorerName}
                        </div>
                        <img src='/new-tab.svg' className='h-3 mt-2 mr-2'/>
                    </a>
                )
            }
        </div>;
    } else {
        return <a href='a'>
            <div className='flex flex-row items-center mt-2 mx-4'>
                <img className='h-6 shrink-0 mt-2 mr-2 ml-2' src={networkLogoPath} />
                <div className='grow mt-2 mr-6'>{networkName}</div>
            </div>
        </a>;
    }
}

export default ChainSelectPopover;

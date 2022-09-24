import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector';
import * as React from 'react';
import { injected } from '../../../utils/connectors';
import { useEagerConnect, useInactiveListener } from '../../../hooks/web3-provider-hooks';
import Spinner from '../../common/Spinner';
import { SandboxFlowContext } from '../../../hooks/sandbox-flow-store';


function getErrorMessage(error: Error) {
    if (error instanceof NoEthereumProviderError) {
        return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
    } else if (error instanceof UnsupportedChainIdError) {
        return "You're connected to an unsupported network."
    } else if (error instanceof UserRejectedRequestErrorInjected) {
        return 'Please authorize this website to access your Ethereum account.'
    } else {
        console.error(error)
        return 'An unknown error occurred. Check the console for more details.'
    }
}

function ConnectButton(props: {}) {
    const context = useWeb3React<Web3Provider>();
    const { connector, library, chainId, account, activate, deactivate, active, error } = context;
    const [sandboxFlowData, sandboxFlowDataDispatch] = React.useContext(SandboxFlowContext);
  
    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = React.useState<any>();
    React.useEffect(() => {
      if (activatingConnector && activatingConnector === connector) {
        setActivatingConnector(undefined)
      }
    }, [activatingConnector, connector]);
  
    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect();
  
    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector);

    const currentConnector = injected;

    const activating = currentConnector === activatingConnector;
    const connected = currentConnector === connector;
    const disabled = !triedEager || !!activatingConnector || connected || !!error;

    if (!disabled) {
        return (
            <div className='h-8 w-96 flex flex-row-reverse items-center mr-8'>
                <button
                    className='bg-primary-alt rounded-lg p-1.5 px-2'
                    disabled={disabled}
                    onClick={() => {
                        setActivatingConnector(currentConnector)
                        activate(currentConnector, (error) => {
                            if (error) {
                                setActivatingConnector(undefined);
                            }
                        })
                    }}
                >
                    Connect
                </button>
            </div>
        );
    } else {
        return <div className='h-6 flex flex-row-reverse items-center mr-8'>
            {(active || error) && (
                <button
                    className='bg-primary-alt rounded-lg p-1.5 px-2'
                    onClick={() => {
                        deactivate()
                        sandboxFlowDataDispatch({ type: 'SET_ACCOUNT_ADDRESS_CHAIN_ID', payload: undefined });
                    }}
                >
                    Disconnect
                </button>
            )}

            {!!error && <h4>{getErrorMessage(error)}</h4>}
        </div>;
    }
}

export default ConnectButton;

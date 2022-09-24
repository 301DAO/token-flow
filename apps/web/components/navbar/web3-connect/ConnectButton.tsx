import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector';
import * as React from 'react';
import { injected } from '../../../utils/connectors';
import { useEagerConnect, useInactiveListener } from '../../../utils/web3-provider-hooks';
import Spinner from '../../common/Spinner';


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
    const context = useWeb3React<Web3Provider>()
    const { connector, library, chainId, account, activate, deactivate, active, error } = context
  
    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = React.useState<any>()
    React.useEffect(() => {
      if (activatingConnector && activatingConnector === connector) {
        setActivatingConnector(undefined)
      }
    }, [activatingConnector, connector])
  
    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect()
  
    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector)

    const currentConnector = injected;

    const activating = currentConnector === activatingConnector
    const connected = currentConnector === connector
    const disabled = !triedEager || !!activatingConnector || connected || !!error

    if (!disabled) {
        return (
            <>
                <button
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
                    <div>
                        {activating && <Spinner />}
                        {connected && (
                            <span role="img" aria-label="check">
                            ✅
                            </span>
                        )}
                    </div>
                    Connect
                </button>
            </>
        );
    } else {
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {(active || error) && (
            <button
                onClick={() => {
                deactivate()
                }}
            >
                Deactivate
            </button>
            )}

            {!!error && <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>{getErrorMessage(error)}</h4>}
        </div>;
    }
}

export default ConnectButton;

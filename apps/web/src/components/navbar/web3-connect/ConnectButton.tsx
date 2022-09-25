import * as React from 'react';
import Spinner from '../../common/Spinner';
import { SandboxFlowContext } from '../../../hooks/sandbox-flow-store';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';

function ConnectButton() {
  const [sandboxFlowData, sandboxFlowDataDispatch] = React.useContext(SandboxFlowContext);

  return <RainbowConnectButton chainStatus={'icon'} showBalance={true} accountStatus={'address'} />;
}

export default ConnectButton;

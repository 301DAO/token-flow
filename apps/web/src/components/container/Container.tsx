import * as React from 'react';
import SequenceTrigger from './SequenceTrigger';
import SequenceAction from './SequenceAction';
import ModeSelector from './ModeSelector';
import { SandboxFlowContext } from '../../hooks/sandbox-flow-store';
import { useAccount } from 'wagmi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const fetchAddress = async () =>
  fetch('/api/auth/session')
    .then((res) => res.json())
    .then((data) => data.user.name);

const saveRules = async ({
  accountAddress,
  rules,
}: {
  accountAddress: string;
  rules: Array<any>;
}) =>
  fetch('/api/rules', {
    method: 'POST',
    body: JSON.stringify({ accountAddress, rules }),
  }).then((res) => res.json());

function Container() {
  const { isConnected, isConnecting, isDisconnected, address } = useAccount();

  const [sandboxFlowData, sandboxFlowDataDispatch] = React.useContext(SandboxFlowContext);
  console.log(sandboxFlowData);

  const queryClient = useQueryClient();

  const mutation = useMutation(saveRules, {
    onSuccess: () => queryClient.invalidateQueries(['rules']),
  });
  return (
    <div className="flex flex-col relative -top-4 z-10 pb-4 grow shadow bg-transparent min-w-full min-h-screen">
      <div className="grid grid-cols-3 items-center rounded-t-3xl min-h-max shrink-0 h-16 border-b border-solid border-border-gray bg-white min-w-full shadow">
        <div className="flex flex-col ml-10">
          <p className="text-lg">Sandbox</p>
          <p className="text-xs text-slate-700">Test out your ideas</p>
        </div>
        <div className="flex flex-col items-center">
          <ModeSelector selected="editor" />
        </div>
        <div className="flex flex-row-reverse items-center grow shrink-0">
          <button
            className="h-10 bg-slate-300 rounded-lg mr-4 px-4 hover:bg-green-500"
            onClick={(event) => {
              event.preventDefault();
              if (!address) return;
              mutation.mutate({
                accountAddress: address,
                rules: [sandboxFlowData],
              });
            }}
          >
            <img src="turn-off.svg" className="h-5" />
          </button>
          <button className="h-10 bg-slate-300 rounded-lg mr-4 px-4">
            <img src="diskette.svg" className="h-5" />
          </button>
        </div>
      </div>

      <div
        style={{
          background:
            'linear-gradient(90deg, #f3f3f3 20px, transparent 1%) center, linear-gradient(#f3f3f3 20px, transparent 1%) center, #b8b8b8',
          backgroundSize: '22px 22px',
        }}
        className="flex flex-col items-center border-b border-solid border-border-gray shadow min-w-full grow"
      >
        <div className="h-10" />
        <SequenceTrigger />
        <div className="h-20 flex flex-row items-center">
          <img src="/down-arrow.svg" className="h-10" />
        </div>
        <SequenceAction />
      </div>
    </div>
  );
}

export default Container;

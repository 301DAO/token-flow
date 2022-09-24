import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { FlowModel } from "../models/flow-model";


export function useSandboxFlowData(): [FlowModel, (flow: FlowModel) => void] {
    const [sandboxFlowData, setSandboxFlowData] = useState<FlowModel>({ accountAddress: undefined });

    const { account, library, chainId } = useWeb3React();

    useEffect(() => {
        if (!!account && !!library) {
            setSandboxFlowData({ ...sandboxFlowData, accountAddress: account });
        }
    }, [account, library]); // intentionally only running on mount (make sure it's only mounted once :))

    return [sandboxFlowData, setSandboxFlowData];
};

import { FormControl } from '@mui/material';
import * as React from 'react';
import { useSandboxFlowData } from '../../../hooks/sandbox-flow-hooks';


function ReceiveFunds (props: {}) {
    const [sandboxFlowData , setSandboxFlowData] = useSandboxFlowData();

    if (sandboxFlowData.accountAddress === undefined) {
        return <></>;
    }

    return <div>
        <FormControl>
            <p>TODO</p>
        </FormControl>
    </div>
}

export default ReceiveFunds;

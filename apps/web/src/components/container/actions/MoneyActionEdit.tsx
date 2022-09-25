import { MenuItem, Select, TextField, Button } from '@mui/material';
import { AlertStrategy, MoneyStrategy, MoneyStrategyType } from 'internal-common';
import * as React from 'react';
import { SandboxFlowContext } from '../../../hooks/sandbox-flow-store';


interface MoneyActionEditProps {
  strategies: MoneyStrategy[];
  setStrategies: (strategies: MoneyStrategy[]) => void;
}

const MoneyActionEdit = function (props: MoneyActionEditProps) {
  const { strategies, setStrategies } = props;
  const [sandboxFlowData, sandboxFlowDataDispatch] = React.useContext(SandboxFlowContext);


  return <div className='flex flex-col'>
    <div className='flex flex-row items-center'>

      {strategies.length > 0 && <div className='rounded-lg px-2 py-5 shadow my-5 mx-2 bg-primary-bg'>Money received</div>}
      {strategies.length > 0 && <div>➡️</div>}
      <div className='flex flex-col'>
        {strategies.map((strategy, index) => {
          return <div id={`node-connect-${index}`} className='mx-2 my-1 rounded-lg px-5 py-5 shadow bg-gray-200'>
            <Select
              id="alert-type"
              value={
                strategy.actionType || 'DEFAULT'
              }
              onChange={(event) => {
                if (event.target.value !== 'DEFAULT') {
                  setStrategies(strategies.map((strat, strategyIndex) => {
                    if (strategyIndex === index) {
                      return { ...strat, actionType: event.target.value as MoneyStrategyType };
                    }
                    return strat;
                  }));
                }
              }}
              defaultValue="DEFAULT"
              className="w-80 mb-4"
              variant="standard"
              label="Alert type"
              required
            >
              <MenuItem value="DEFAULT"> </MenuItem>
              <MenuItem value={MoneyStrategyType.DEPOSIT_TO_AAVE}>Deposit to AAVE</MenuItem>
              <MenuItem value={MoneyStrategyType.SWAP_ON_UNISWAP}>Swap on UNI</MenuItem>
              <MenuItem value={MoneyStrategyType.TRANSFER_TO_ADDRESS}>Transfer to an address</MenuItem>
            </Select>
            <TextField
              id="alert-destination-path"
              // label="Notification delivery path (URL)"
              variant="standard"
              placeholder='Destination address'
              value={strategy.destinationAddress || ''}
              className="mx-4 w-80"
              onChange={(event) => {
                setStrategies(strategies.map((strat, strategyIndex) => {
                  if (strategyIndex === index) {
                    return { ...strat, destinationPath: event.target.value };
                  }
                  return strat;
                }));
              }}
            />
            <div className='flex flex-row-reverse mt-2'>
              <Button variant='outlined' color='error' size='small' onClick={() => {
                setStrategies(strategies.filter((_, i) => i !== index));
              }}>Remove</Button>
            </div>
          </div>;
        })}
      </div>
    </div>

    <Button
      className='mt-10'
      variant='outlined'
      disabled={strategies.length >= 3}
      onClick={() => {
      setStrategies([
        ...strategies,
        {
          actionType: MoneyStrategyType.TRANSFER_TO_ADDRESS,
          originationAddress: sandboxFlowData.accountAddress || '',
          destinationAddress: '',
          tokenInAddress: ''
        }]);
      }}
    >
      New
    </Button>
  </div>;
}

export default MoneyActionEdit;

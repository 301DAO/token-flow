import { Button, MenuItem, Select, TextField } from '@mui/material';
import { AlertStrategy, AlertType } from 'internal-common';
import * as React from 'react';


interface AlertActionEditProps {
  strategies: AlertStrategy[];
  setStrategies: (strategies: AlertStrategy[]) => void;
}

const AlertActionEdit = function (props: AlertActionEditProps) {
  const { strategies, setStrategies } = props;

  console.log('strategies', strategies);

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
                strategy.alertType || 'DEFAULT'
              }
              onChange={(event) => {
                if (event.target.value !== 'DEFAULT') {
                  setStrategies(strategies.map((strat, strategyIndex) => {
                    if (strategyIndex === index) {
                      return { ...strat, alertType: event.target.value as AlertType };
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
              <MenuItem value={AlertType.EPNS} disabled>EPNS (Work in progress)</MenuItem>
              <MenuItem value={AlertType.PIPEDREAM}>Pipedream Integration</MenuItem>
            </Select>
            <TextField
              id="alert-destination-path"
              // label="Notification delivery path (URL)"
              variant="standard"
              placeholder='Notification delivery path (URL)'
              value={strategy.destinationPath || ''}
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
              <button
                className="p-2 bg-red-300 rounded-lg shadow hover:bg-red-400"
                onClick={() => {
                  setStrategies(strategies.filter((_, i) => i !== index));
                }}
              >
                <img src='/garbage-bin-icon.svg' className='h-4 w-4' />
              </button>
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
      setStrategies([...strategies, { alertType: AlertType.PIPEDREAM, message: 'placeholder', destinationPath: 'placeholder' }]);
      }}
    >
      New
    </Button>
  </div>;
}

export default AlertActionEdit;

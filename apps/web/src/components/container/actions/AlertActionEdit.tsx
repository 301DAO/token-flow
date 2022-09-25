import { Button, Card, MenuItem, Select } from '@mui/material';
import { AlertStrategy, AlertType } from 'internal-common';
import * as React from 'react';


const AlertActionEdit = function () {
  const [strategies, setStrategies] = React.useState<AlertStrategy[]>([]);

  return <div className='flex flex-col'>
    <div className='flex flex-row items-center'>
      <div className='rounded-lg px-2 py-5 shadow my-5 mx-2'>Money received</div>
      {strategies.length > 0 && <div>➡️</div>}
      <div className='flex flex-col'>
        {strategies.map((strategy, index) => {
          return <div id={`node-connect-${index}`} className='mx-2 my-1 rounded-lg px-5 py-5 shadow'>
            <Select
              id="alert-type"
              value={
                strategy.alertType || 'DEFAULT'
              }
              defaultValue="DEFAULT"
              className="ml-4 mr-4 w-80"
              variant="standard"
              label="Alert type"
              required
            >
              <MenuItem value="DEFAULT"> </MenuItem>
              <MenuItem value={AlertType.EPNS} disabled>EPNS</MenuItem>
              <MenuItem value={AlertType.PIPEDREAM}>Pipedream Integration</MenuItem>
            </Select>
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
      Add new notification destination
    </Button>
  </div>;
}

export default AlertActionEdit;

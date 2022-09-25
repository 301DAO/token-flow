import { Button, Card } from '@mui/material';
import { AlertStrategy, AlertType } from 'internal-common';
import * as React from 'react';
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';


const AlertActionEdit = function () {
  const [strategies, setStrategies] = React.useState<AlertStrategy[]>([]);

  return <div className='flex flex-col items-center'>
    <div id='main'>Money received</div>
    <div className='flex flex-row mt-10'>
      {strategies.map((strategy, index) => {
        return <div id={`node-connect-${index}`}>
          <Card>{strategy.alertType}</Card>
          <Xarrow start="main" end={`node-connect-${index}`} showHead={false} startAnchor={'bottom'} path={'grid'} />
        </div>;
      })}
    </div>
    

    {strategies.length < 3 && <Button
      variant='contained'
      onClick={() => {
      setStrategies([...strategies, { alertType: AlertType.PIPEDREAM, message: 'placeholder', destinationPath: 'placeholder' }]);
      }}
    >Add new notification destination</Button>}
  </div>;
}

export default AlertActionEdit;

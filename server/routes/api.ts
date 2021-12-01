import * as express from 'express'

import {
    CompletionStatus, 
    DeviceBasicInfo, 
    GenericOpResponse, 
    HarvesterAPIs, 
    HarvesterOpResponseType
} from '@nanometrics/pegasus-harvest-lib';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('Welcome to use API router');
});

router.get('/list', (req, res) => {
    console.log('[server] list');
    let execId = HarvesterAPIs.list();
    if(execId === 0) {
        return res.send({api: 'list', ret: undefined});
    }
    let detected_devices: string[] = [];
    let handle = setInterval(()=> {
        //get responses for harvester operation using its id (opId)
        const responsesString: string = HarvesterAPIs.get_op_responses(execId, 0);
        if (responsesString !== null && responsesString !== "")
        {
          //parse responses string into JSON object
          const responsesJSON: any = JSON.parse(responsesString);
          //iterate through "data" array in responses JSON
          for (let i: number = 0; i < responsesJSON.responses.length; i++)
          { 
            const responseString: string = responsesJSON.responses[i];
            console.log(`Processing response: ${responseString}`);
            //parse response JSON string into JSON object
            const response: GenericOpResponse = JSON.parse(responseString);
            if (response && response.type == HarvesterOpResponseType.response && response.data) 
            {
              const libPath: string = (response.data as DeviceBasicInfo).system_path;
              console.debug(`Detected ${libPath}`);
              detected_devices.push(libPath);
            }
            else if (response && response.type == HarvesterOpResponseType.completion)
            {
               
              const status = (response.data as CompletionStatus).status;
              console.log(`'list' finished (status: ${status}, devices: ${JSON.stringify(detected_devices)}`);
              return res.send({
                api: 'list',
                ret: detected_devices});

            }
          }
        }
        else
        {
          clearInterval(handle);
        }
      },1000 /*1 sec update interval*/);
    
});
export = router;
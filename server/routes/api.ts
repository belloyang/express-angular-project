import * as express from 'express'

import {
    CompletionStatus, 
    CompletionStatusType, 
    DeviceBasicInfo, 
    DigitizerInfo, 
    ErrorCategory, 
    ErrorInfo, 
    GenericOpResponse, 
    HarvesterAPIs, 
    HarvesterOpResponseType
} from '@nanometrics/pegasus-harvest-lib';
import { OpResponseType } from 'src/models/op-response-type';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('Welcome to use API router');
    res.send('Welcome to use API router');
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
              console.log(`Detected ${libPath}`);
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

router.get('/get_digitizer_info/:libPath', (req, res) => {
    console.log(`api/get_digitizer_info(${req.params.libPath})`);
    let execId = HarvesterAPIs.get_digitizer_info(req.params.libPath);
    if(execId === 0) {
        return res.send({api: 'get_gitizier_info', ret: undefined});
    }
    let digitizerInfo: DigitizerInfo;
    let handle = setInterval(()=> {


        const responsesString: string = HarvesterAPIs.get_op_responses(execId, 0);
        if (responsesString !== null && responsesString !== "")
        {
        //parse responses string into JSON object
        const responsesJSON: any = JSON.parse(responsesString);
        console.log('responsesJSON returned from get_op_responses', responsesJSON);
        for (let responseStr of responsesJSON.responses) {
            try {
              let response: GenericOpResponse = JSON.parse(responseStr);
              console.log('digitizer_info: GenericOpResponse:', response, execId);

              switch (response.type) {
                case HarvesterOpResponseType.response: {
                  if (response.data) {
                    digitizerInfo = response.data as DigitizerInfo;
                  }
                  break;
                }
                case HarvesterOpResponseType.completion : {
                  console.log(`get_digitizer_info():${execId} completed:`, digitizerInfo);
                  let status = response.data as CompletionStatus;
                  if (status.status === CompletionStatusType.completed) {

                    console.log('get_digitizer_info completed');
                    return res.send({
                        api: 'list',
                        ret: digitizerInfo
                    });
                  }
                  else {
                    console.warn(`get_digitizer_info(${req.params.libPath}) : ${CompletionStatusType[status.status] || status.status}`);
                    return Promise.resolve(undefined);

                  }

                  break;
                }
                case HarvesterOpResponseType.error : {
                  // Error Handling:
                  console.error('Lib-level error @ get_digitizer_info:', response.data);
                  let errorInfo: ErrorInfo = response.data as ErrorInfo;
                  if (errorInfo.category === ErrorCategory.ERROR_CATEGORY_SYSTEM) {

                    console.error(`System Error (EC: ${errorInfo.error_code}), get_digitizer_info aborted. \n${errorInfo.description}`);
                    // await this.harvesterApiService.abort(execId);
                    return res.send({
                        api: 'list',
                        ret: new Error(`System Error(EC: ${errorInfo.error_code}): ${errorInfo.description}`)
                    });
                  }
                  break;
                }
              }

            } catch (err) {
              console.error('UI-level error @ get_digitizer_info: Failed to parse operation response JSON', responseStr, err);
            }
        }

        
        }else
        {
          clearInterval(handle);
        }
      }, 1000);
});


export = router;
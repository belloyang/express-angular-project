/**
 * Required External Modules
 */
 import * as dotenv from "dotenv";
 import * as express from "express";

 import {
    CompletionStatus, 
    DeviceBasicInfo, 
    GenericOpResponse, 
    HarvesterAPIs, 
    HarvesterOpResponseType
} from '@nanometrics/pegasus-harvest-lib';
/**
 * App Variables
 */
 dotenv.config();
 if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);

 const app = express();
 app.use(express.static('../dist/my-angular-express-project'));

/**
 *  App Configuration
 */
 const ads = [
    {title: 'Hello, world!'}
  ];
/**
 * Server Activation
 */

app.get('/list', (req, res) => {
    console.log('[server] list');
    let execId = HarvesterAPIs.list();
    if(execId === 0) {
        return res.send(`<h1>Hello you called list</h1>
        <h2>Return:  Invalid execID ${execId}</h2>
        `);
    }
    let detected_devices = [];
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
              return res.send(detected_devices);

            }
          }
        }
        else
        {
          clearInterval(handle);
        }
      },1000 /*1 sec update interval*/);
    
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

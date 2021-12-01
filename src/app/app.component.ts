import { Component } from '@angular/core';
import { HarvesterApiService } from '../services/harvester-api.service';
import * as moment from 'moment';
import { HarvestParams } from 'src/models/harvest-params';
import { UpperLimit } from 'src/models/constants';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-express-project';
  libPath = "";
  harvestDatetime = {
    from: "",
    to: ""
  };
  outputDir =  "";
  outputPattern = "";
  hoursPerFile = 24;

  constructor(public harvesterApiService: HarvesterApiService){}
  
  convertMillisecToMicrosec(value_millisec: number): number {
    return value_millisec * 1000;
  }
  dateTimeStringToEpochMicroSec(utcDatetimeStr: string): number {
    return this.convertMillisecToMicrosec(moment.utc(utcDatetimeStr).valueOf());
  }
  harvestData() {
    if(this.outputDir == "" || this.outputPattern == "") {
      alert("please specify output Directory and output Pattern and try again");
      console.error("please specify output Directory and output Pattern and try again");
      return;
    }
    let harvestFromMs = 0;
    let harvrstToMs = UpperLimit.timestamp;
    if(this.harvestDatetime.from !== "") {
      harvestFromMs = this.dateTimeStringToEpochMicroSec(this.harvestDatetime.from);
    }
    if(this.harvestDatetime.to !== "") {
      harvrstToMs = this.dateTimeStringToEpochMicroSec(this.harvestDatetime.to);
    }
    let params: HarvestParams = {
      range: {
        lower: {time_microsecs: harvestFromMs},
        upper: {time_microsecs: harvrstToMs}
      },
      output_path: this.outputDir,
      output_pattern: this.outputPattern,
      hours_per_file: this.hoursPerFile
    };
    let updateStep = 0.1;
    console.log('harvestData', this.libPath, params, updateStep);

  }
}

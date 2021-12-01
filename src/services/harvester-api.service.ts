import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HarvestParams } from '@nanometrics/pegasus-harvest-lib';

const SERVER_BASE_URL: string =`http://localhost:4201`;

@Injectable({
  providedIn: 'root'
})
export class HarvesterApiService {

  constructor(private http: HttpClient) { 
    console.log('HarvesterApiService constructed');
  }
  list() {
    console.log('call list');
    this.http.get(SERVER_BASE_URL + `/api/list`)
    .subscribe((data) => {
      console.log('receive data', data);
    });

  }

  toUrlString(str: string) {
    return str.replace(/\//g, "%2F");
  }

  get_digitizer_info(libPath: string) {
    console.log('get_digitizer_info', libPath);
    this.http.get(SERVER_BASE_URL + `/api/get_digitizer_info/${this.toUrlString(libPath)}`)
    .subscribe((data) => {
      console.log('receive data', data);
    });
  }

  harvest_data(libPath: string, params: HarvestParams, updateStep: number) {
    console.log('harvest_data:', libPath, params, updateStep);
    this.http.post(SERVER_BASE_URL + `/api/harvest_data`, {libPath, params, updateStep})
    .subscribe((data) => {
      console.log("post /api/harvest_data response:", data);
    });
  }
}

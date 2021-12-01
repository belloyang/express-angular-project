import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

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
}

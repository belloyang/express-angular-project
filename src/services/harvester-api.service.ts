import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HarvesterApiService {

  constructor() { 
    console.log('HarvesterApiService constructed');
  }
  list() {
    console.log('call list');
  }
}

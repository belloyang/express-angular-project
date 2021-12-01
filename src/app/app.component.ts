import { Component } from '@angular/core';
import { HarvesterApiService } from '../services/harvester-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-express-project';
  libPath = "";
  constructor(public harvesterApiService: HarvesterApiService){}
  
}

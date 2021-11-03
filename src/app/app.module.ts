import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule, MatButtonModule } from '@angular/material'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const materialModules = [
  MatCardModule,
  MatButtonModule
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...materialModules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

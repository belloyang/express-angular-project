import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule, MatButtonModule } from '@angular/material'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

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
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ...materialModules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

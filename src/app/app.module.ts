import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { HttpService } from './http/http.service';

export function httpProvider(backend: XHRBackend, options: RequestOptions, router: Router) {
  return new HttpService(backend, options, router);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [
    {
      provide: HttpService,
      useFactory: httpProvider,
      deps: [XHRBackend, RequestOptions]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

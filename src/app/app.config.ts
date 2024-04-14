import { ApplicationConfig, NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { jwtDecode } from 'jwt-decode';

export const appConfig: ApplicationConfig = {


  providers: [provideRouter(routes),
    provideHttpClient(),
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
  ]
};

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

import {
  MsalModule,
  MsalRedirectComponent,
  MsalGuard,
  MsalInterceptor,
} from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [AppComponent, HomeComponent, ProfileComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: environment.clientId, // Application (client) ID from the app registration
          authority: `https://login.microsoftonline.com/${environment.tenantId}/`, // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
          redirectUri: 'http://localhost:4200', // This is your redirect URI
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
        },
      }),
      {
        interactionType: InteractionType.Redirect, // MSAL Guard Configuration
        authRequest: {
          scopes: ['user.read'],
        },
      },
      {
        interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
        protectedResourceMap: new Map([
          [environment.msGraphApi, ['user.read', 'Group.ReadWrite.All']],
        ]),
      }
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    MsalGuard,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}

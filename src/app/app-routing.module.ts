import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MsalGuard } from '@azure/msal-angular';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatDetailComponent } from './components/chat-detail/chat-detail.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [MsalGuard],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'chats',
    component: ChatListComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'chats/:id',
    component: ChatDetailComponent,
    canActivate: [MsalGuard],
  },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: !isIframe ? 'enabledBlocking' : 'disabled', // Don't perform initial navigation in iframes
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: 'feedback',
    loadChildren: () =>
      import('./smiley/smiley.module').then((m) => m.SmileyModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'feedbackEventsHome',
    loadChildren: () =>
      import('./feedback-events/feedback-events.module').then(
        (m) => m.FeedbackEventsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

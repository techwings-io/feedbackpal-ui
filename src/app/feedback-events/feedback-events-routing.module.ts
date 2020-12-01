import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackEventsFormComponent } from './components/feedback-events-form/feedback-events-form.component';
import { FeedbackEventsHomeComponent } from './components/feedback-events-home/feedback-events-home.component';

const routes: Routes = [
  {
    path: 'createFeedbackEvent',
    component: FeedbackEventsFormComponent,
  },
  {
    path: '',
    component: FeedbackEventsHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackEventsRoutingModule {}

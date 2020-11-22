import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackEventsFormComponent } from './components/feedback-events-form/feedback-events-form.component';

const routes: Routes = [{ path: '', component: FeedbackEventsFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackEventsRoutingModule {}

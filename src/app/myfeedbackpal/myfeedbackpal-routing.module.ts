import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyFeedbackpalHomeComponent } from './my-feedbackpal-home/my-feedbackpal-home.component';

const routes: Routes = [
  {
    path: 'myFeedbacks',
    component: MyFeedbackpalHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyfeedbackpalRoutingModule {}

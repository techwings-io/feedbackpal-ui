import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyfeedbackpalRoutingModule } from './myfeedbackpal-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MyFeedbackpalHomeComponent } from './my-feedbackpal-home/my-feedbackpal-home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyFeedbackDetailComponent } from './my-feedbackpal-home/my-feedback-detail/my-feedback-detail.component';

@NgModule({
  declarations: [MyFeedbackpalHomeComponent, MyFeedbackDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    MyfeedbackpalRoutingModule,
    NgxPaginationModule,
  ],
})
export class MyfeedbackpalModule {}

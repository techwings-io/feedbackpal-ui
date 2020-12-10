import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyfeedbackpalRoutingModule } from './myfeedbackpal-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MyFeedbackpalHomeComponent } from './my-feedbackpal-home/my-feedbackpal-home.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [MyFeedbackpalHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    MyfeedbackpalRoutingModule,
    NgxPaginationModule,
  ],
})
export class MyfeedbackpalModule {}

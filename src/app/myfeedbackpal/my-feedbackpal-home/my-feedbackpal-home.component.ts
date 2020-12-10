import { Component, OnInit } from '@angular/core';
import { MyFeedbacksDto } from '../dtos/my.feedbacks.dto';

import { environment as env } from '../../../environments/environment';
import { PaginationDto } from '../../../shared/pagination/pagination-dto';
import { MyFeedbackpalService } from '../services/myfeedbackpal.service';
import { take, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaginatedResultsDto } from '../../shared/pagination/paginated-results-dto';

@Component({
  selector: 'app-my-feedbackpal-home',
  templateUrl: './my-feedbackpal-home.component.html',
  styleUrls: ['./my-feedbackpal-home.component.scss'],
})
export class MyFeedbackpalHomeComponent implements OnInit {
  myFeedbacks: MyFeedbacksDto[];

  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [10, 20, 30, 40, 50];

  private apiUrl = `${env.api.serverUrl}/myFeedbackpal/myFeedbacks`;

  constructor(private myFeedbackpalService: MyFeedbackpalService) {}

  ngOnInit(): void {
    this.fetchMyFeedbacks();
  }

  fetchNextBatch() {
    this.fetchMyFeedbacks();
  }

  //----> Private stuff

  private fetchMyFeedbacks(): void {
    this.myFeedbackpalService
      .getMyFeedbacks(this.getPaginationDto())
      .pipe(
        take(1),
        catchError((err) => of([]))
      )
      .subscribe((result: PaginatedResultsDto<MyFeedbacksDto>) => {
        console.log('result', result);

        this.myFeedbacks = result.data;
        this.count = result.totalCount;
      });
  }

  private getPaginationDto(): PaginationDto {
    const paginationDto = new PaginationDto();
    paginationDto.page = this.page;
    paginationDto.limit = this.tableSize;

    return paginationDto;
  }
}

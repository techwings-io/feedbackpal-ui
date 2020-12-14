import { Component, OnInit } from '@angular/core';
import { MyFeedbacksDto } from '../dtos/my.feedbacks.dto';

import { PaginationDto } from '../../../shared/pagination/pagination-dto';
import { MyFeedbackpalService } from '../services/myfeedbackpal.service';
import { take, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaginatedResultsDto } from '../../shared/pagination/paginated-results-dto';
import { Router } from '@angular/router';

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

  constructor(
    private myFeedbackpalService: MyFeedbackpalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchMyFeedbacks();
  }

  onSelectEvent(event) {
    event.preventDefault();
    this.router.navigateByUrl('/feedbackEventsHome');
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
        this.myFeedbacks = result.data;
      });
  }

  private getPaginationDto(): PaginationDto {
    const paginationDto = new PaginationDto();
    paginationDto.page = this.page;
    //TODO change it to be configurable
    paginationDto.limit = 10;
    return paginationDto;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { PaginatedResultsDto } from 'src/app/shared/pagination/paginated-results-dto';
import { PaginationDto } from 'src/shared/pagination/pagination-dto';
import { MyFeedbacksDto } from '../../dtos/my.feedbacks.dto';
import { MyFeedbackpalService } from '../../services/myfeedbackpal.service';

@Component({
  selector: 'app-my-feedback-detail',
  templateUrl: './my-feedback-detail.component.html',
  styleUrls: ['./my-feedback-detail.component.scss'],
})
export class MyFeedbackDetailComponent implements OnInit {
  @Input()
  myFeedbacks: MyFeedbacksDto[];

  page = 1;
  @Input()
  count = 0;
  tableSize = 10;
  tableSizes = [10, 20, 30, 40, 50];

  constructor(private myFeedbackpalService: MyFeedbackpalService) {}

  ngOnInit(): void {}

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
        this.myFeedbacks = result.data;
      });
  }

  private getPaginationDto(): PaginationDto {
    const paginationDto = new PaginationDto();
    paginationDto.page = this.page;

    return paginationDto;
  }
}

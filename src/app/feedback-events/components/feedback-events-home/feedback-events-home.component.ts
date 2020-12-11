import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FeedbackEvent } from '../../../shared/model/feedback-events.model';

import { catchError, take } from 'rxjs/operators';
import { throwError, Observable, Subscription } from 'rxjs';

import { Router } from '@angular/router';
import { PaginatedResultsDto } from '../../../shared/pagination/paginated-results-dto';
import { FeedbackEventsService } from '../../services/feedback-events.service';
import { PaginationDto } from '../../../shared/pagination/pagination-dto';
import { GetFeedbackEventsFilterDto } from '../../dtos/get.feedback.events.filter.dto';

@Component({
  selector: 'app-feedback-events-home',
  templateUrl: './feedback-events-home.component.html',
  styleUrls: ['./feedback-events-home.component.scss'],
})
export class FeedbackEventsHomeComponent implements OnInit, OnDestroy {
  feedbackEvents: FeedbackEvent[] = [];
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [10, 20, 30, 40, 50];

  errorOccurred = false;

  http$: Subscription;

  constructor(
    private feedbackEventsService: FeedbackEventsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchFeedbackEvents();
    console.log(
      'page, count, tableSize',
      this.page,
      this.count,
      this.tableSize
    );
  }

  ngOnDestroy() {
    if (this.http$) {
      this.http$.unsubscribe();
    }
  }

  areThereAnyFeedbackEvents(): boolean {
    return this.feedbackEvents.length > 0;
  }

  fetchNextBatch() {
    this.fetchFeedbackEvents();
  }

  displayCreateEventForm(): void {
    this.router.navigate(['feedbackEventsHome', 'createOrUpdateFeedbackEvent']);
  }

  onTableDataChange(event) {
    this.page = event;
    this.fetchFeedbackEvents();
  }

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchFeedbackEvents();
  }

  //-----> Private stuff
  private fetchFeedbackEvents(): void {
    const http$ = this.feedbackEventsService.getFeedbackEvents(
      this.getPaginationDto()
    );
    this.http$ = http$
      .pipe(
        take(1),
        catchError((err) => {
          console.error('An error occurred while retrieving events');
          this.errorOccurred = true;
          return throwError(err);
        })
      )
      .subscribe((paginatedResults: PaginatedResultsDto<FeedbackEvent>) => {
        console.log('paginated results', paginatedResults);
        this.feedbackEvents = paginatedResults.data;
        this.count = paginatedResults.totalCount;
      });
  }

  private getPaginationDto(): GetFeedbackEventsFilterDto {
    const paginationDto = new GetFeedbackEventsFilterDto();
    paginationDto.page = this.page;
    paginationDto.limit = this.tableSize;

    return paginationDto;
  }
}

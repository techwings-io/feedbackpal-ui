import { Injectable } from '@angular/core';
import { PaginationDto } from '../../../shared/pagination/pagination-dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResultsDto } from '../../shared/pagination/paginated-results-dto';
import { MyFeedbacksDto } from '../dtos/my.feedbacks.dto';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MyFeedbackpalService {
  private apiUrl = `${env.api.serverUrl}/myFeedbackpal/myFeedbacks`;

  constructor(private http: HttpClient) {}

  getMyFeedbacks(
    paginationDto: PaginationDto
  ): Observable<PaginatedResultsDto<MyFeedbacksDto>> {
    let params: HttpParams;
    if (paginationDto) {
      if (paginationDto.limit) {
        params = new HttpParams().set('limit', String(paginationDto.limit));
      }
      if (paginationDto.page) {
        params = params.set('page', String(paginationDto.page));
      }
    }

    return this.http.get<PaginatedResultsDto<MyFeedbacksDto>>(this.apiUrl, {
      params,
    });
  }
}

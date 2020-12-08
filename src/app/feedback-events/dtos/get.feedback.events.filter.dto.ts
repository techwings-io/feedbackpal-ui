import { PaginationDto } from '../../../shared/pagination/pagination-dto';

export class GetFeedbackEventsFilterDto extends PaginationDto {
  validFrom: Date;
  validTo: Date;
  eventName: string;
  active: boolean;
}

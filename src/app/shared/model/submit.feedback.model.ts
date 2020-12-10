import { Feeling } from './feeling.enum';

export interface SubmitFeedback {
  eventId: string;
  createdBy: string;
  lastCreated: Date;
  feeling: Feeling;
  comments: string;
}

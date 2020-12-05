import { Feeling } from '../../smiley/model/smiley.model';

export interface SubmitFeedback {
  eventId: string;
  createdBy: string;
  lastCreated: Date;
  feeling: Feeling;
  comments: string;
}

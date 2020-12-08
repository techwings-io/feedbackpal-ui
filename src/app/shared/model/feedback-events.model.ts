export interface FeedbackEvent {
  id: string;
  eventName: string;
  description: string;
  createdBy: string;
  email: string;
  publicEvent: boolean;
  usersToShareWith: string[];
  validFrom: Date;
  validTo: Date;
  totalHappy?: number;
  totalNeutral?: number;
  totalUnhappy?: number;
  totalFeedbacks?: number;
}

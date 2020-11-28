export interface FeedbackEvent {
  eventName: string;
  description: string;
  createdBy: string;
  email: string;
  validFrom: Date;
  validTo: Date;
}

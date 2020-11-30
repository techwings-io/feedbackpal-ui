export interface FeedbackEvent {
  id: string;
  eventName: string;
  description: string;
  createdBy: string;
  email: string;
  publicEvent: boolean;
  validFrom: Date;
  validTo: Date;
}

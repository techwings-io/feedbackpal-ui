export enum Feeling {
  HAPPY,
  NEUTRAL,
  ANGRY,
}

export interface Smiley {
  id: string;
  path: string;
  cardTitle: string;
  cardText: string;
  feeling: Feeling;
}

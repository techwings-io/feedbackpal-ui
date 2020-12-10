import { Feeling } from '../../shared/model/feeling.enum';

export interface Smiley {
  id: string;
  path: string;
  cardTitle: string;
  cardText: string;
  feeling: Feeling;
}

import {Track} from './track';

export interface LyricSet {
  name: string;
  description: string;
  image: string;
  tracklist: Track[];
  id: string;
}

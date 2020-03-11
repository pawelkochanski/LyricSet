import {Track} from './search-track-response';

export interface LyricSet {
  name: string;
  description: string;
  imageId: string;
  tracklist: Track[];
  id: string;
}

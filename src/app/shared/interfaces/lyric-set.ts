import {Track} from './track';

export interface LyricSet {
  name: string;
  description: string;
  imageId: string;
  tracklist: Track[];
  id: string;
  isPrivate: boolean;
}

import {Track} from './track';
import {UserResponse} from './userResponse';

export interface SearchBarResponse {
  byTitle: SerachTrackResponse;
  byArtist: SerachTrackResponse;
  users: UserResponse[];
}

export interface SerachTrackResponse {
  track_list: TrackResponse[];
}

export interface TrackResponse {
  track: Track;

}

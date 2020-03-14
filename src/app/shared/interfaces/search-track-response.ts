import {Track} from './track';

export interface SearchBarResponse {
  byTitle: SerachTrackResponse;
  byArtist: SerachTrackResponse;
}

export interface SerachTrackResponse {
  track_list: TrackResponse[];
}

export interface TrackResponse {
  track: Track;

}

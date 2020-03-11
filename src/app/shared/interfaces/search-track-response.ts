export interface SearchBarResponse {
  byTitle: SerachTrackResponse;
  byArtist: SerachTrackResponse;
}

export interface SerachTrackResponse {
  track_list: {
    track: TrackResponse
  }[];
}

export interface TrackResponse {

  track_name: string;
  track_id: string;
  artist_name: string;
  artist_id: string;
}

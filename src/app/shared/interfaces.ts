export interface Track {
  title: string;
  artist: string;
  img: string;
  lyrics: string;
}

export interface LyricSet {
  name: string;
  description: string;
  image: string;
  tracklist: Track[];
}

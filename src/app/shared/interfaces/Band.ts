import {Track} from './track';

export interface Band {
  tracklist: Track[];
  name: string;
  id: string;
  imageId: string;
  members: Member[];
}

export interface Member {
  userId: string;
  role: MemberRoles;
}

export enum MemberRoles {
  Leader,
  Member
}

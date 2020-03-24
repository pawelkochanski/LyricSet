import {Roles} from '../enums/roles';

export interface  UserResponse {
  role?: Roles;
  displayname: string;
  bio: string;
  url: string;
  id: string;
  avatarId: string;
}

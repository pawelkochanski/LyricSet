import { User } from './user';
export interface LoginResponse {
    exp: Date;
    token: string;
    user: User;
}

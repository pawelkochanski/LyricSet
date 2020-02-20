import { Roles } from '../enums/roles';

export class User {
    constructor(public id: string,
                public username: string,
                public email: string,
                public role: Roles,
                private _token: string) {}

    get token() {
        return this._token;
    }
}

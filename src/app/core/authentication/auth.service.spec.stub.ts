import {BehaviorSubject, of} from 'rxjs';
import {User} from '../../shared/interfaces/user';
import {LoginResponse} from '../../shared/interfaces/loginResponse';


export class AuthServiceSpecStub {
  user = new BehaviorSubject<User>(null);

  logout = () => {};
  register = () => of({});
  login = () => of({} as LoginResponse);
  handleAuthentication = () => {};
  relogin = () => {};
  autoLogin = () => {};
  changePassword = () => of({});
  changeUsername = () => of({});

}

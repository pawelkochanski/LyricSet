import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }

public register(registerData: {username: string, email: string, password: string}) {
  return this.http.post(
    environment.apiUrl + 'users/register',
    registerData,
  );

}
public login(loginData: {username: string, password: string}) {
  return this.http.post(
    environment.apiUrl + 'users/login',
    loginData
  );

}

public checkUsername(username: string) {
  console.log(username);
  return this.http.get(
    environment.apiUrl + 'users/username',
    {params: new HttpParams().set('username', username)}
  );
}

public checkEmail(email: string) {
  return this.http.get(
    environment.apiUrl + 'users/email',
    {params: new HttpParams().set('email', email)}
  );
}

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { User } from 'app/shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

constructor(private http: HttpClient,
            private readonly router: Router) { }

public updateProfile(displayname: string, bio: string, url: string) {
  if (displayname || bio || url) {
    return this.http.put<User>(
      environment.apiUrl + 'users',
      {displayname, bio, url},
    );
  }
  return null;

}

}

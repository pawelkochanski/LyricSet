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

public updateAvatar(avatar: any) {
  console.log(avatar);
  const formData = new FormData();
  formData.append('file', avatar, avatar.filename);
  if (avatar) {
    return this.http.post<{avatarId: string}>(
      environment.apiUrl + 'avatars',
      formData);
  }
}

public removeAvatar(avatarId: string) {
  return this.http.delete(environment.apiUrl + 'avatars/' + avatarId);
}

}

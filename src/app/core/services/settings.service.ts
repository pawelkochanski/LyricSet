import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';
import {Settings} from '../../shared/interfaces/settings';
import {Observable} from 'rxjs';
import {ImagesData} from '../../shared/interfaces/imageData';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) {
  }

  public updateProfile(data: Settings): Observable<Settings> {
    return this.http.put<Settings>(
      environment.apiUrl + 'users',
      data
    );
  }

  public updateAvatar(avatar: any): Observable<ImagesData> {
    console.log(avatar);
    const formData = new FormData();
    formData.append('file', avatar, avatar.filename);
    if (avatar) {
      return this.http.post<ImagesData>(
        environment.apiUrl + 'images/avatar',
        formData);
    }
    return null;
  }

  public removeAvatar(avatarId: string): Observable<any> {
    return this.http.delete(environment.apiUrl + 'images/' + avatarId);
  }

}

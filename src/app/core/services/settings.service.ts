import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Settings} from '../../shared/interfaces/settings';
import {Observable} from 'rxjs';
import {ImagesData} from '../../shared/interfaces/imageData';
import {AppSettings} from '../../shared/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) {
  }

  public updateProfile(data: Settings): Observable<Settings> {
    return this.http.put<Settings>(
      AppSettings.apiUrl + 'users',
      data
    );
  }

  public updateAvatar(avatar: File): Observable<ImagesData> {
    if (avatar) {
      const formData = new FormData();
      formData.append('file', avatar, avatar.name);
      return this.http.post<ImagesData>(
        AppSettings.apiUrl + 'images/avatar',
        formData);
    }
    return null;
  }

  public removeAvatar(avatarId: string): Observable<void> {
    return this.http.delete<void>(AppSettings.apiUrl + 'images/' + avatarId);
  }

}

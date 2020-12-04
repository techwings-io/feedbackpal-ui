import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Auth0UserModel } from '../model/auth0.user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  apiUrl = `${environment.api.serverUrl}/auth/auth0-users`;

  constructor(private http: HttpClient) {}

  async getUsers(userName: string): Promise<Auth0UserModel[]> {
    const params: HttpParams = new HttpParams().set('userName', userName);
    return await this.http
      .get<Auth0UserModel[]>(this.apiUrl, {
        params,
      })
      .toPromise();
  }
}

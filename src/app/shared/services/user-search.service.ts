import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Auth0UserModel } from '../model/auth0.user.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  apiUrl = `${environment.api.serverUrl}/auth/auth0-users`;

  private userToShareWithSelectedSource = new Subject<Auth0UserModel>();
  private userToShareWithDeselectedSource = new Subject<Auth0UserModel>();
  private usersToShareWithSource = new Subject<Auth0UserModel[]>();

  userToShareWithSelected$ = this.userToShareWithSelectedSource.asObservable();
  userToShareWithDeselected$ = this.userToShareWithDeselectedSource.asObservable();
  usersToShareWith$ = this.usersToShareWithSource.asObservable();

  constructor(private http: HttpClient) {}

  async getUsers(userName: string): Promise<Auth0UserModel[]> {
    const params: HttpParams = new HttpParams().set('userName', userName);
    return await this.http
      .get<Auth0UserModel[]>(this.apiUrl, {
        params,
      })
      .toPromise();
  }

  userToShareWithSelected(user: Auth0UserModel) {
    this.userToShareWithSelectedSource.next(user);
  }

  userToShareWithDeselected(user: Auth0UserModel) {
    this.userToShareWithDeselectedSource.next(user);
  }

  broadcastUsersToShareWith(users: Auth0UserModel[]) {
    this.usersToShareWithSource.next(users);
  }
}

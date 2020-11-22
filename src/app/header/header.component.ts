import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { environment as env } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {}

  testJwt() {
    return this.http
      .post(`${env.dev.serverUrl}/auth/test/jwt`, {})
      .subscribe((data) => {
        console.log(data);
      });
  }
}

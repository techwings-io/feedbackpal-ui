import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {
  NgcCookieConsentService,
  NgcStatusChangeEvent,
} from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

import { environment as env } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cookiesAccepted = false;

  private statusChangeSubscription: Subscription;

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private ccService: NgcCookieConsentService
  ) {}

  ngOnInit(): void {
    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        this.cookiesAccepted = event.status === 'allow';
        console.log('cookies accepted', this.cookiesAccepted);
      }
    );
  }

  testJwt() {
    return this.http
      .post(`${env.api.serverUrl}/auth/test/jwt`, {})
      .subscribe((data) => {
        console.log(data);
      });
  }
}

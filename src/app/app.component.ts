import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { environment as env } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private ccService: NgcCookieConsentService) {
    let userHasConsentedToCookies = false;
    if (localStorage.getItem(env.cookieConsent.localStorageKey)) {
      userHasConsentedToCookies = !!JSON.parse(
        localStorage.getItem(env.cookieConsent.localStorageKey)
      );
    }
    if (userHasConsentedToCookies) {
      this.ccService.close(true);
    } else {
      this.ccService.open();
    }
  }
}

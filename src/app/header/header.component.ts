import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {
  NgcCookieConsentService,
  NgcStatusChangeEvent,
} from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

import { environment as env } from '../../environments/environment';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;

  routerFreshSubscription: Subscription;

  cookiesAccepted = false;

  constructor(
    public auth: AuthService,
    private ccService: NgcCookieConsentService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.routerFreshSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem(env.cookieConsent.localStorageKey)) {
      this.cookiesAccepted = JSON.parse(
        localStorage.getItem(env.cookieConsent.localStorageKey)
      );
      console.log('User cookies consent', this.cookiesAccepted);
    } else {
      this.cookiesAccepted = false;
    }
    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        const userConsentedToCookies = event.status === 'allow' ? true : false;
        this.storeCookiePreferenceInLocalStorage(userConsentedToCookies);
      }
    );

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        console.log('Revoking cookies consent');

        this.storeCookiePreferenceInLocalStorage(false);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.revokeChoiceSubscription) {
      this.revokeChoiceSubscription.unsubscribe();
    }
    if (this.routerFreshSubscription) {
      this.routerFreshSubscription.unsubscribe();
    }
    if (this.statusChangeSubscription) {
      this.statusChangeSubscription.unsubscribe();
    }
  }

  //-------> Private stuff
  private storeCookiePreferenceInLocalStorage(accepted: boolean) {
    console.log('Storing user cookie preference to local storage');

    localStorage.setItem(
      env.cookieConsent.localStorageKey,
      JSON.stringify(accepted)
    );
    this.cookiesAccepted = accepted;
  }
}

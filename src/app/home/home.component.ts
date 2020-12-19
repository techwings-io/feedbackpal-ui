import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  NgcCookieConsentService,
  NgcStatusChangeEvent,
} from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  //keep refs to subscriptions to be able to unsubscribe later

  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;

  routerFreshSubscription: Subscription;

  userAcceptedCookies = false;

  constructor(
    private router: Router,
    private ccService: NgcCookieConsentService
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
      this.userAcceptedCookies = JSON.parse(
        localStorage.getItem(env.cookieConsent.localStorageKey)
      );
      console.log('User cookies consent', this.userAcceptedCookies);
    } else {
      this.userAcceptedCookies = false;
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
    if (this.statusChangeSubscription) {
      this.statusChangeSubscription.unsubscribe();
    }
    if (this.revokeChoiceSubscription) {
      this.revokeChoiceSubscription.unsubscribe();
    }

    if (this.routerFreshSubscription) {
      this.routerFreshSubscription.unsubscribe();
    }
  }

  visitFeedbackEventsHome() {
    this.router.navigateByUrl('/feedbackEventsHome');
  }

  //-------> Private stuff
  private storeCookiePreferenceInLocalStorage(accepted: boolean) {
    console.log('Storing user cookie preference to local storage');

    localStorage.setItem(
      env.cookieConsent.localStorageKey,
      JSON.stringify(accepted)
    );
    this.router.navigateByUrl('/');
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  NgcCookieConsentService,
  NgcStatusChangeEvent,
} from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  cookiesAccepted = false;
  //keep refs to subscriptions to be able to unsubscribe later

  private statusChangeSubscription: Subscription;

  constructor(
    private router: Router,
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

  ngOnDestroy(): void {
    this.statusChangeSubscription.unsubscribe();
  }

  visitFeedbackEventsHome() {
    this.router.navigateByUrl('/feedbackEventsHome');
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NgcCookieConsentService,
  NgcInitializeEvent,
  NgcNoCookieLawEvent,
  NgcStatusChangeEvent,
} from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}

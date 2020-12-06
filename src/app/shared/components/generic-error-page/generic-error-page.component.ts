import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generic-error-page',
  templateUrl: './generic-error-page.component.html',
  styleUrls: ['./generic-error-page.component.scss'],
})
export class GenericErrorPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onHomeButtonClicked(event) {
    event.preventDefault();
    this.router.navigateByUrl('/');
  }
}

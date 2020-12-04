import { Component, Input, OnInit } from '@angular/core';
import { Auth0UserModel } from '../../model/auth0.user.model';

@Component({
  selector: 'app-user-search-detail',
  templateUrl: './user-search-detail.component.html',
  styleUrls: ['./user-search-detail.component.scss'],
})
export class UserSearchDetailComponent implements OnInit {
  @Input()
  candidateUser: Auth0UserModel;

  constructor() {}

  ngOnInit(): void {}
}

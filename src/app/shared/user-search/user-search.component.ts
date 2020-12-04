import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserSearchService } from '../services/user-search.service';
import { Auth0UserModel } from '../model/auth0.user.model';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent implements OnInit {
  searchTerm: string = '';

  candidateUsersToShareWith: Auth0UserModel[] = [];

  constructor(private userSearchService: UserSearchService) {}

  ngOnInit(): void {}

  onUsernameChange(event) {
    this.searchTerm = event;
    if (this.searchTerm.length > 2) {
      return this.userSearchService
        .getUsers(this.searchTerm)
        .then((users) => {
          this.candidateUsersToShareWith = users;
        })
        .catch((err) => console.log(err));
    }
  }
}

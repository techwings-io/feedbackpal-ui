import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserSearchService } from '../services/user-search.service';
import { Auth0UserModel } from '../model/auth0.user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent implements OnInit, OnDestroy {
  searchTerm: string = '';

  candidateUsersToShareWith: Auth0UserModel[] = [];

  selectedUsersToShareWith: Auth0UserModel[] = [];

  selectedUsersToShareWith$: Subscription;
  deSelectedUsersToShareWith$: Subscription;

  constructor(private userSearchService: UserSearchService) {
    this.selectedUsersToShareWith$ = this.userSearchService.userToShareWithSelected$.subscribe(
      (user) => {
        this.selectedUsersToShareWith.push(user);
        this.broadcastSelectedUsers();
      }
    );

    this.deSelectedUsersToShareWith$ = this.userSearchService.userToShareWithDeselected$.subscribe(
      (deselectedUser) => {
        this.selectedUsersToShareWith = this.selectedUsersToShareWith.filter(
          (user) => {
            return user.user_id !== deselectedUser.user_id;
          }
        );
        this.broadcastSelectedUsers();
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.selectedUsersToShareWith$) {
      this.selectedUsersToShareWith$.unsubscribe();
    }
    if (this.deSelectedUsersToShareWith$) {
      this.deSelectedUsersToShareWith$.unsubscribe();
    }
  }

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

  private broadcastSelectedUsers(): void {
    this.userSearchService.broadcastUsersToShareWith(
      this.selectedUsersToShareWith
    );
  }
}

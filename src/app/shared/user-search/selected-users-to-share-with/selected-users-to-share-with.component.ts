import { Component, Input, OnInit } from '@angular/core';
import { Auth0UserModel } from '../../model/auth0.user.model';
import { UserSearchService } from '../../services/user-search.service';

@Component({
  selector: 'app-selected-users-to-share-with',
  templateUrl: './selected-users-to-share-with.component.html',
  styleUrls: ['./selected-users-to-share-with.component.scss'],
})
export class SelectedUsersToShareWithComponent implements OnInit {
  @Input()
  userToShareWith: Auth0UserModel;

  constructor(private userSearchService: UserSearchService) {}

  ngOnInit(): void {}

  onUserDeselected(event) {
    event.preventDefault();
    this.userSearchService.userToShareWithDeselected(this.userToShareWith);
  }
}

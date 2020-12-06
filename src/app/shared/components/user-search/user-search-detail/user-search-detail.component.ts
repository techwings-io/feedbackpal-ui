import { Component, Input, OnInit } from '@angular/core';
import { Auth0UserModel } from 'src/app/shared/model/auth0.user.model';
import { UserSearchService } from 'src/app/shared/services/user-search.service';

@Component({
  selector: 'app-user-search-detail',
  templateUrl: './user-search-detail.component.html',
  styleUrls: ['./user-search-detail.component.scss'],
})
export class UserSearchDetailComponent implements OnInit {
  @Input()
  candidateUser: Auth0UserModel;

  selected = false;

  constructor(private userSearchService: UserSearchService) {}

  ngOnInit(): void {}

  onUserSelected(event) {
    event.preventDefault();
    this.selected = true;
    this.userSearchService.userToShareWithSelected(this.candidateUser);
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserSearchService } from '../services/user-search.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent implements OnInit {
  searchTerm: string = '';

  constructor(private userSearchService: UserSearchService) {}

  ngOnInit(): void {}

  onUsernameChange(event) {
    this.searchTerm = event;
    if (this.searchTerm.length > 2) {
      return this.userSearchService
        .getUsers(this.searchTerm)
        .subscribe((data) => console.log(data));
    }
  }
}

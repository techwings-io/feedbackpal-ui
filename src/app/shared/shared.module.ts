import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';

import { ReactiveFormsModule } from '@angular/forms';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { UserSearchDetailComponent } from './components/user-search/user-search-detail/user-search-detail.component';
import { SelectedUsersToShareWithComponent } from './components/user-search/selected-users-to-share-with/selected-users-to-share-with.component';
import { GenericErrorPageComponent } from './components/generic-error-page/generic-error-page.component';

@NgModule({
  declarations: [
    InputComponent,
    UserSearchComponent,
    UserSearchDetailComponent,
    SelectedUsersToShareWithComponent,
    GenericErrorPageComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent, UserSearchComponent, GenericErrorPageComponent],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';

import { ReactiveFormsModule } from '@angular/forms';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserSearchDetailComponent } from './user-search/user-search-detail/user-search-detail.component';
@NgModule({
  declarations: [InputComponent, UserSearchComponent, UserSearchDetailComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent, UserSearchComponent],
})
export class SharedModule {}

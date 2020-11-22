import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmileyHomeComponent } from './smiley-home/smiley-home.component';

const routes: Routes = [{ path: '', component: SmileyHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmileyRoutingModule {}

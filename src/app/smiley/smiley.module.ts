import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmileyRoutingModule } from './smiley-routing.module';
import { SmileyHomeComponent } from './smiley-home/smiley-home.component';
import { SmileyCardComponent } from './smiley-home/smiley-card/smiley-card.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SmileyHomeComponent, SmileyCardComponent],
  imports: [CommonModule, SmileyRoutingModule, SharedModule, FormsModule],
  exports: [],
})
export class SmileyModule {}

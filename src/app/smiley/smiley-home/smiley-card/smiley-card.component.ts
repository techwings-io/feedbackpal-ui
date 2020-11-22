import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { Smiley } from '../../model/smiley.model';

@Component({
  selector: 'app-smiley-card',
  templateUrl: './smiley-card.component.html',
  styleUrls: ['./smiley-card.component.scss'],
})
export class SmileyCardComponent implements OnInit {
  @Input()
  smiley: Smiley;

  highlighted = false;

  @Output()
  selectedSmiley = new EventEmitter<Smiley>();

  @ViewChild('displayForm')
  displayForm: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  onSmileySelected() {
    console.log(this.displayForm.nativeElement.checked);

    this.selectedSmiley.emit(this.smiley);
  }

  onMouseEvent(event) {
    this.highlighted = event.type === 'mouseover' ? true : false;
  }
}

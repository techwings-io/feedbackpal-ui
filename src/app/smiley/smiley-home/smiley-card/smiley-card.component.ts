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

  displayTellUsMoreTextArea = false;

  @ViewChild('tellUsMoreTextArea')
  textAreaEl: ElementRef;

  tellUsMoreText: string;

  highlighted = false;

  constructor() {}

  ngOnInit(): void {}

  onTellUsMore() {
    this.displayTellUsMoreTextArea = !this.displayTellUsMoreTextArea;
  }

  onMouseEvent(event) {
    this.highlighted = event.type === 'mouseover' ? true : false;
  }

  onTextEntered(event: KeyboardEvent) {
    this.tellUsMoreText += event.key;
  }

  onSubmitFeedback(event) {
    this.tellUsMoreText = this.textAreaEl.nativeElement.value;

    //TODO To submit the feedback to the API
  }
}

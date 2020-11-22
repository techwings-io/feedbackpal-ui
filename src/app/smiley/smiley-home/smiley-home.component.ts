import { Component, OnInit } from '@angular/core';
import { Feeling, Smiley } from '../model/smiley.model';

@Component({
  selector: 'app-smiley-home',
  templateUrl: './smiley-home.component.html',
  styleUrls: ['./smiley-home.component.scss'],
})
export class SmileyHomeComponent implements OnInit {
  smileys: Smiley[] = [
    {
      id: '1',
      path: '../assets/images/glassy-smiley-red.png',
      cardTitle: 'Not Happy',
      cardText:
        'So you are not feeling happy. Would you like to leave a message?',
      feeling: Feeling.ANGRY,
    },
    {
      id: '2',
      path: '../assets/images/glassy-smiley-amber.png',
      cardTitle: 'Neutral',
      cardText:
        'So you are feeling neutral. Would you like to leave a message?',
      feeling: Feeling.NEUTRAL,
    },
    {
      id: '3',
      path: '../assets/images/glassy-smiley-green.png',
      cardTitle: 'Happy',
      cardText: 'So you are feeling happy. Would you like to leave a message?',
      feeling: Feeling.HAPPY,
    },
  ];

  onSelectedSmiley(smiley: Smiley) {
    console.log('App selected smiley', smiley);
  }

  constructor() {}

  ngOnInit(): void {}
}
